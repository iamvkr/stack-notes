import { useState } from 'react'
import Button from '../Button';
import { CourseDataInterface, usefileContext } from '../../context/FilesContext';
import { getPlaylistData } from '../../utils/getPlaylistData';
import { saveToDbCourses } from '../../lib/db';

const CreateCourse = ({ isOpenCourseModal, setisOpenCourseModal }: { isOpenCourseModal: boolean, setisOpenCourseModal: (isOpen: boolean) => void }) => {
  const [itemName, setItemName] = useState("");/** https://www.youtube.com/playlist?list=PLRBp0Fe2GpgmcS2npLZXJCyJxPdkwX4Bc */
  const { courses, setCourses, toastMsg } = usefileContext();

  const saveUser = async () => {
    if (!itemName.trim()) {
      toastMsg("cannot be empty", "error");
      return false;
    }
    const data = await getPlaylistData(itemName.trim());
    if (!data || !data.pid) {
      toastMsg("Invalid Link", "error");
      return false;
    }

    if (data.pid !== null) {
      const pid = data.pid;
      const updatedData = [
        {
          ...data,
          pid,
          completed: []
        },
        ...(courses as CourseDataInterface[]),
      ];
      const res = await saveToDbCourses(updatedData);
      setCourses(res)
      toastMsg("Successfully created!", "success");
      setisOpenCourseModal(false);
    }
  }



  return (isOpenCourseModal &&
    <div className='fixed top-0 left-0 w-full h-screen bg-dark-bg/70 flex items-center justify-center'
      onClick={() => { setisOpenCourseModal(!isOpenCourseModal) }}>
      <div className="modal w-[85%]  border bg-dark-bg rounded-2xl p-4 animate-enter md:w-1/3 md:h-60" onClick={(e) => { e.stopPropagation() }}>
        <h2 className='text-xl font-bold mb-4'>Youtube Playlist Link</h2>
        <div className='my-2'>
          <input value={itemName} onChange={(e) => { setItemName(e.target.value) }} type="text"
            className='h-10 w-full border rounded-md ps-2 outline-none'
            placeholder='e.g. https://www.youtube.com/playlist?list='
          />
        </div>
        <Button className={"block ms-auto mt-4"} onClick={saveUser}>Create</Button>
      </div>
    </div>
  )
}

export default CreateCourse