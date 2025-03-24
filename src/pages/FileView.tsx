import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TabCard from '../components/TabCard'
import FAB from '../components/FAB';
import Modal from '../components/Modals/Modal';
import { usefileContext } from '../context/FilesContext';
import { ArrowLeft } from 'lucide-react';

type contentType = Array<{
  id: string,
  title: string
}>
const FileView = () => {
  const { pathname } = useLocation();
  const [refreshFilesArr, setrefreshFilesArr] = useState<contentType>([])
  const { setSelectedIndexArr, files, } = usefileContext();

  useEffect(() => {
    // reset the selected arr:
    setSelectedIndexArr([]);

    // reset to prev data
    const targetObj = files.find(item => pathname === `/files/${item.slug}`);
    if (targetObj && Array.isArray(targetObj.content)) {
      setrefreshFilesArr(targetObj.content);
    }

  }, [pathname, files])

  const [isOpenModal, setisOpenModal] = useState(false);
  return (
    <div className='px-4 py-18'>
      <div className='text-xl font-bold mb-3 inderline flex cursor-pointer items-center' onClick={() => { window.history.back() }}>
        <ArrowLeft className='text-primary' />
        <span>Back</span>
      </div>
      {refreshFilesArr && refreshFilesArr.length <= 0 && <div className='w-full h-[60vh] flex items-center justify-center text-lg'>No Files Found</div>}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {refreshFilesArr && refreshFilesArr.map((data, i) => (<TabCard key={i} index={i} data={data} />))}
      </div>

      <FAB onClick={() => { setisOpenModal(!isOpenModal) }} />
      <Modal isOpenModal={isOpenModal} setisOpenModal={setisOpenModal} />
    </div>
  )
}

export default FileView;
