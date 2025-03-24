import React, { useEffect, useState } from 'react'
import FabCourse from '../components/FabCourse';
import CreateCourse from '../components/Modals/CreateCourse';
import { usefileContext } from '../context/FilesContext';
import { getDataFromCourses, saveToDbCourses } from '../lib/db';
import CourseCard from '../components/CourseCard';

const Course = (): React.JSX.Element => {
  const [isOpenCourseModal, setisOpenCourseModal] = useState(false);
  const { courses, setCourses, setSelectedIndexArr, toastMsg, userName,loadCourse, setLoadCourse } = usefileContext();


  useEffect(() => {
    // reset the selected arr:
    setSelectedIndexArr([]);

    if (courses?.length <= 0) {
      console.log("FETCHINH courses....");
      setLoadCourse({...loadCourse,isLoading:true})
      getDataFromCourses()
        .then(res => {
          if (res.length > 0) {
            setCourses([
              ...courses,
              ...res
            ]);
          }
          setTimeout(() => {
            setLoadCourse({...loadCourse,isFinished:true,isLoading:false})
          }, 1000);
        })
    }
  }, [])

  const handleDelete = async (i: number) => {
    if (confirm("Are you sure to delete?")) {
      const updatedData = courses.filter((_, index) => (i !== index));
      setCourses(updatedData);
      // save to db 
      const res = await saveToDbCourses(updatedData);
      if (res) {
        toastMsg("Delete success", "success")
      }
    }
  }

  return (
    <div className='px-4 pt-18 pb-24'>
      <h1 className='text-xl font-bold mb-3'>My Courses</h1>
      
      {loadCourse.isLoading && !loadCourse.isFinished && <div className='h-[50vh] flex w-full justify-center items-center'>
        <img src="./loading.svg" className='w-10 h-10 animate-spin' alt="" />
      </div>}

      <div className="grid grid-cols-1 gap-4">
        {loadCourse.isFinished && courses && courses.length > 0 && courses.map((item, i) => (
          <div className='card' key={i}>
            <CourseCard item={item} handleDelete={() => { handleDelete(i) }} />
          </div>
        ))}

        {loadCourse.isFinished && courses && courses.length <= 0 && <div className="bg-emerald-600 rounded-xl min-h-[60vh] md:max-h-[70vh]">
          <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
            <h1 className="text-4xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50">
              Hi {userName}, <p className='text-lg mt-3'>Click on Plus icon to Create a new Course!</p>
              <div>
                <img src="/undraw_online-learning.svg" className='w-full mt-2  md:h-[30vh]' alt="" />
              </div>
            </h1>
          </div>
        </div>}
      </div>

      <FabCourse onClick={() => { setisOpenCourseModal(!isOpenCourseModal) }} />

      <CreateCourse isOpenCourseModal={isOpenCourseModal} setisOpenCourseModal={setisOpenCourseModal} />{/* modal */}
    </div>
  )
}

export default Course