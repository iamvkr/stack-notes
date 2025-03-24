import { CheckCircle, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CourseDataInterface } from '../context/FilesContext.tsx';

const CourseCard = ({ item, handleDelete }: { item: CourseDataInterface, handleDelete: () => void }) => {
    const [totalVideos, settotalVideos] = useState(0);

    useEffect(() => {
        const ss = sessionStorage.getItem("courseDATA");
        if (ss && typeof (item.pid) === "string") {
            
            const cache = JSON.parse(ss);
            if (cache && cache[item.pid]) {
                settotalVideos(cache[item.pid].length)
            }
        }
    }, [])

    return (
        <div className="max-w-sm bg-dark-bg text-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/course/${item.pid}`}>
                <img className="rounded-t-lg h-40 object-cover w-full" src={`https://img.youtube.com/vi/${item.thumbnailId}/mqdefault.jpg`} alt="" />
            </Link>
            <div className="p-5">
                <Link to={`/course/${item.pid}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">
                        {typeof (item.pTitle) === "string" && item.pTitle}
                    </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-200 dark:text-gray-400">
                    {typeof (item.channel) === "string" && item.channel}
                </p>
                <div className='flex items-center gap-x-2 justify-between'>
                    <div className='flex items-center gap-x-2'><CheckCircle className='w-4 h-4' />
                        {Array.isArray(item.completed) && item.completed.length}
                        {totalVideos > 0 && "/" + totalVideos} completed
                        {false}
                    </div>
                    <Trash className='w-4 h-4' onClick={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default CourseCard