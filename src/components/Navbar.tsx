import { FileStack, MenuIcon, Trash } from 'lucide-react'
import { usefileContext } from '../context/FilesContext'
import { useLocation } from 'react-router-dom';
import { getDataFromFO, saveToDbFO, saveToDbFS } from '../lib/db';

const Navbar = () => {
    const { files, setFiles, selectedIndexArr, setSelectedIndexArr, toastMsg } = usefileContext();
    const { pathname } = useLocation();

    const handleDelete = async () => {
        if (selectedIndexArr.length <= 0) {
            return false;
        }
        const indexSet = new Set(selectedIndexArr);
        let newArr = [];
        if (pathname === "/") {
            // is a folder:
            // to delete all ids under filesObj:
            const filteredFolder = files.filter((_, i) => indexSet.has(i));
            // console.log("FILTERED FOLDER:", filteredFolder);
            const toDelArr: string[] = [];
            filteredFolder.forEach(f => {
                if (!Array.isArray(f.content)) return false;
                f.content.forEach(fileItem => {
                    toDelArr.push(fileItem.id)
                });
            });
            // console.log("final selected ids:", toDelArr);
            const filesObj = await getDataFromFO();
            toDelArr.forEach(id => {
                if (filesObj.hasOwnProperty(id)) {
                    delete (filesObj[id]);
                }
            });
            const res = await saveToDbFO(filesObj);
            if (!res) {
                toastMsg("DELETING file object Error!!", "error")
                return false
            }

            // To delete files from fileSystem SET:
            newArr = files.filter((_, i) => !indexSet.has(i));

        } else {
            // is a file
            /** delete from filesObj: */
            const filesObj = await getDataFromFO();
            let temp = (files.filter(file => (pathname === `/files/${file.slug}`)))[0];
            if (!Array.isArray(temp.content)) {
                return false;
            }
            let tempCONTENT = temp.content;
            const toDelIdsArr: string[] = (tempCONTENT.filter((_, i) => indexSet.has(i))).map((file => file.id));
            toDelIdsArr.forEach(id => {
                if (filesObj.hasOwnProperty(id)) {
                    // filesObj[id] are those items that will be deleted
                    delete filesObj[id]
                }
            });
            const res = await saveToDbFO(filesObj);
            if (!res) {
                toastMsg("DELETING file Error!!", "error")
                return false
            }
            // console.log("DELETE after saved: ", res);


            /** NOEW DELETE IN fileSystem */
            newArr = files.map(file => {
                if (pathname === `/files/${file.slug}` && Array.isArray(file.content)) {
                    return {
                        ...file,
                        content: [...file.content.filter((_, i) => !indexSet.has(i))]
                    }
                } else {
                    return file;
                }
            });
            // console.log("deleted from fileStstem"); 
        }
        const res = await saveToDbFS(newArr);
        setFiles(res);
        setSelectedIndexArr([]);
        toastMsg("Deleted Successfully", "success");
    }

    return (
        <nav className='fixed top-0 left-0 h-18 w-full px-4 text-primary bg-dark-bg'>
            <div className='flex h-18 items-center gap-x-2 justify-between lg:max-w-3/4 lg:mx-auto'>
                <div className='flex gap-x-4 items-center'>
                    <FileStack className='w-8 h-8' />
                    <h1 className='text-2xl'>Stack Notes</h1>
                </div>
                {(selectedIndexArr && selectedIndexArr.length > 0) ? <div className='flex gap-x-4'>
                    <Trash onClick={() => {
                        if (confirm("Are you sure to delete?")) {
                            handleDelete()
                        }
                    }} />
                </div>
                    :
                    <div className='flex gap-x-4'>
                        <MenuIcon className='lg:hidden' />
                        <a href='#' className='hover:border-b-2 hidden lg:block'>Home</a>
                        <a href='#features_home' className='hover:border-b-2 hidden lg:block'>Features</a>
                        <a href='#' className='hover:border-b-2 hidden lg:block'>About</a>
                    </div>}
            </div>
        </nav>
    )
}

export default Navbar