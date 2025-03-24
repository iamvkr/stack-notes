import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FilesDataInterface, usefileContext } from '../context/FilesContext';

type fileContentType = {
    id:string,
    title:string
  }

const TabCard = ({ data, index }: { data: (FilesDataInterface | fileContentType), index: number }) => {
    const [isChecked, setisChecked] = useState(false);
    const { pathname } = useLocation();

    const { selectedIndexArr, setSelectedIndexArr } = usefileContext();

    const handleToggle = () => {
        if (isChecked) {
            // remove index from array
            setSelectedIndexArr(selectedIndexArr.filter((e) => (e !== index)))
        } else {
            // add to arr:
            setSelectedIndexArr([...selectedIndexArr, index])
        }
        setisChecked(!isChecked);
    }


    return (
        <div className='w-full h-[40vw] border border-zinc-500 shadow shadow-[#e0e0e0] rounded md:h-60 mt-2'>
            <div className="checkbox bg-500 h-[30%] flex justify-end pe-2 pt-2">

                <div className={`circle h-6 w-6 rounded-full cursor-pointer  border-2 ${isChecked && "bg-primary"}`}
                onClick={handleToggle}>
                </div>

            </div>
            <div className="h-[70%]">
                {pathname === "/"&& "slug" in data ? <Link to={`/files/${data.slug}`}
                    className='overflow-hidden h-full px-1 text-xl text-center flex items-center justify-center flex-col'>
                    <span className='text-2xl'>📁</span> <span>{typeof(data.title) === "string" && data.title}</span>
                </Link>
                    :
                    <Link to={`/openFile/${data.id}`}
                        className='overflow-hidden h-full px-1 text-xl text-center flex items-center justify-center flex-col'>
                        <span className='text-2xl'>📄</span> <span>{typeof(data.title) === "string" && data.title}</span>
                    </Link>
                }
            </div>
        </div>
    )
}

export default TabCard