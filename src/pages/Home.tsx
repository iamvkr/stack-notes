import { useEffect, useState } from 'react'
import TabCard from '../components/TabCard.tsx'
import FAB from '../components/FAB.tsx';
import Modal from '../components/Modals/Modal.tsx';
import { usefileContext } from '../context/FilesContext';
import { FilesDataInterface } from '../context/FilesContext';
import { getDataFromFS } from '../lib/db';
import HomeUI from '../components/HomeUI.tsx';
import UsernameModal from '../components/Modals/UsernameModal.tsx';

const Home = () => {

  const { files, setFiles, setSelectedIndexArr, userName,loadHome, setLoadHome, } = usefileContext();

  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenUserModal, setisOpenUserModal] = useState(false);

  useEffect(() => {
    // reset the selected arr:
    setSelectedIndexArr([]);

    if (files?.length <= 0) {
      console.log("FETCHINH FILES....");
      setLoadHome({...loadHome,isLoading:true})
      getDataFromFS()
        .then(res => {
          if (res.length > 0) {
            setFiles([
              ...files,
              ...(res as FilesDataInterface[])
            ]);
          }
          setTimeout(() => {
            setLoadHome({...loadHome,isFinished:true,isLoading:false})
          }, 1000);

        })
    }
  }, [])

  return (
    <div className='px-4 py-18'>
      {userName && files && files.length <= 0 && <h1 className='text-xl font-bold mb-3'>Home</h1>}

      {loadHome.isLoading && !loadHome.isFinished && <div className='h-[50vh] flex w-full justify-center items-center'>
        <img src="./loading.svg" className='w-10 h-10 animate-spin' alt="" />
      </div>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {loadHome.isFinished && files && files.length > 0 && files.map((data, i) => (<TabCard key={i} index={i} data={data} />))}
      </div>

      {loadHome.isFinished && files && files.length <= 0 && <div className={userName && "mb-16"}>
        <HomeUI setisOpenUserModal={setisOpenUserModal} userName={userName} />
      </div>}

      {userName ? <FAB onClick={() => { setisOpenModal(!isOpenModal) }} /> : <UsernameModal isOpenUserModal={isOpenUserModal} setisOpenUserModal={setisOpenUserModal} />}
      <Modal isOpenModal={isOpenModal} setisOpenModal={setisOpenModal} />
    </div>
  )
}

export default Home