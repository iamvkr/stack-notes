import { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import { getDataFromFO, saveToDbFO, saveToDbFS } from '../../lib/db';
import { useLocation } from 'react-router-dom';
import { FilesDataInterface, usefileContext } from '../../context/FilesContext';

const Modal = ({ isOpenModal, setisOpenModal, }: { isOpenModal: boolean, setisOpenModal: (isOpen: boolean) => void }) => {
    const [file, setfile] = useState<File | null>(null);
    const [itemName, setItemName] = useState("");
    const { pathname } = useLocation();
    const dropareaRef = useRef<HTMLDivElement | null>(null);

    const { files, setFiles, toastMsg } = usefileContext();

    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (isOpenModal) {
            if (inputRef.current) { inputRef.current.focus() }
        } else {
            if (inputRef.current) { inputRef.current.blur() }
        }
    }, [isOpenModal])

    const CreateFolder = async () => {
        // check file name:
        if (!itemName.trim()) {
            toastMsg("Name cannot be empty", "error");
            return false;
        }
        if (!(/^[a-zA-Z0-9_\s]+$/).test(itemName)) {
            toastMsg("Special characters not allowed", "error");
            return false;
        }
        const res = await saveToDbFS([
            ...(files as FilesDataInterface[]),
            {
                id: Date.now().toString(),
                title: itemName,
                slug: itemName.split(" ").join("-"),
                content: []
            }
        ]);
        setFiles(res as FilesDataInterface[]);
        setisOpenModal(false);
        toastMsg("Folder Created Successfully", "success");
        setItemName("")
    }

    const CreateFile = async () => {
        if (!file) {
            toastMsg("Please select a file", "error");
            return false;
        }
        // check file name:
        if (!itemName.trim()) {
            toastMsg("Name cannot be empty", "error");
            return false;
        }
        if (!(/^[a-zA-Z0-9_.\s]+$/).test(itemName)) {
            toastMsg("Special characters not allowed", "error");
            return false;
        }
        const newFile = {
            id: Date.now().toString(),
            title: itemName,
        }
        // first save file to filesObj:
        const prevDb = await getDataFromFO();
        const savedObj = await saveToDbFO({ ...prevDb, [newFile.id]: file });
        if (!savedObj) {
            toastMsg("Saving file Error!!", "error")
            return false
        }
        // then save to fs
        const newArr = files.map(fileItem => {
            if (pathname === `/files/${fileItem.slug}` && Array.isArray(fileItem.content)) {
                return {
                    ...fileItem,
                    content: [...(fileItem.content), newFile]
                }
            } else {
                return fileItem;
            }
        });
        const res = await saveToDbFS(newArr);
        setFiles(res);
        setisOpenModal(false)
        toastMsg("file Created Successfully", "success");
        // reset local states
        setItemName("")
        setfile(null);
    }

    useEffect(() => {
        if (file) {
            setItemName(file.name)
        }
    }, [file])

    /** file drag drop */
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropareaRef.current === null) return false;
        dropareaRef.current.classList.add('border-4');
        dropareaRef.current.classList.add('border-dashed');
    }
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropareaRef.current === null) return false;
        dropareaRef.current.classList.add('border-4');
        dropareaRef.current.classList.add('border-dashed');
    }
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropareaRef.current === null) return false;
        dropareaRef.current.classList.remove('border-4');
        dropareaRef.current.classList.remove('border-dashed');
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropareaRef.current === null) return false;
        dropareaRef.current.classList.remove('border-4');
        dropareaRef.current.classList.remove('border-dashed');
        let dt = e.dataTransfer;
        let filesArr = Array.from(dt.files);
        if (filesArr[0].type.includes("image") || filesArr[0].type.includes("pdf")) {
            setfile(filesArr[0]);
        } else {
            toastMsg("Only pdf and images are supported!", "error");
        }
        // filesArr = filesArr.filter((f, i) => f.type !== "");
        // setselectedFilesArr(filesArr);
    }


    return (isOpenModal &&
        <div className='fixed top-0 left-0 w-full h-screen bg-dark-bg/70 flex items-center justify-center'
            onClick={() => { setisOpenModal(!isOpenModal) }}>
            <div className={`modal w-[85%]  border bg-dark-bg rounded-2xl p-4 animate-enter md:w-1/3 ${pathname === '/' ? 'md:h-60' : 'md:h-84'} lg:flex lg:flex-col lg:justify-evenly`} onClick={(e) => { e.stopPropagation() }}>
                <h2 className='text-xl font-bold mb-4'>{pathname === "/" ? "Create a New Folder" : "Add New File"}</h2>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className='my-2'>
                        <input ref={inputRef} value={itemName} onChange={(e) => { setItemName(e.target.value) }} type="text"
                            className='h-10 w-full border rounded-md ps-2 outline-none'
                            placeholder='Enter Name'
                        />
                    </div>
                    {pathname !== "/" &&
                        <div ref={dropareaRef} className=' my-2 border border-dashed h-20 rounded-md lg:h-32'
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}>
                            <label htmlFor="fileInput" className=''>
                                <p className='text-center flex w-full items-center justify-center h-full'>Drag and drop <br />{file ? file.name : "Click to upload files"} </p>
                                <input type="file" className='hidden' id='fileInput' multiple={false} accept='image/*,.pdf' onChange={(e) => {
                                    if (e.target.files) {
                                        if (e.target.files[0].type.includes("image") || e.target.files[0].type.includes("pdf")) {
                                            setfile(e.target.files[0]);
                                        } else {
                                            toastMsg("Only pdf and images are supported!", "error");
                                        }
                                    }
                                }} />
                            </label>
                        </div>}
                    {pathname === "/" ? <Button className={"block ms-auto mt-4"} onClick={CreateFolder}>Create</Button> :
                        <Button className={"block ms-auto mt-4"} onClick={CreateFile}>Save</Button>}
                </form>
            </div>
        </div>
    )
}

export default Modal