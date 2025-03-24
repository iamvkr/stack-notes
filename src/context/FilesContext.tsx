import React, { createContext, useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export interface CourseDataInterface {
  pid:string | unknown,
  pTitle:string | unknown,
  thumbnailId:string | unknown,
  channel:string | unknown,
  completed:number[] | unknown,
}

export interface FilesDataInterface {
  id:string | unknown,
  slug:string | unknown,
  title:string | unknown,
  content: Array<{
    id:string,
    title:string
  }> | unknown
}

type FilesContextType = {
  files: FilesDataInterface[];
  setFiles: React.Dispatch<React.SetStateAction<FilesDataInterface[]>>;
  selectedIndexArr: number[];
  setSelectedIndexArr: React.Dispatch<React.SetStateAction<number[]>>;
  filesystem: unknown[];
  setFilesystem: React.Dispatch<React.SetStateAction<unknown[]>>;
  userName: string;
  setuserName: React.Dispatch<React.SetStateAction<string>>;
  courses: CourseDataInterface[];
  setCourses: React.Dispatch<React.SetStateAction<CourseDataInterface[]>>;
  toastMsg: (msg: string, type: ("success"|"error")) => boolean | undefined;
  loadHome:{isLoading: boolean;isFinished: boolean},
  setLoadHome :React.Dispatch<React.SetStateAction<{isLoading: boolean;isFinished: boolean;}>>,
  loadCourse:{isLoading: boolean;isFinished: boolean},
  setLoadCourse :React.Dispatch<React.SetStateAction<{isLoading: boolean;isFinished: boolean;}>>,
}

const filesContext = createContext<FilesContextType | null>(null);

export const usefileContext = () => {
  const context = useContext(filesContext);
  if (!context) {
    throw new Error('usefileContext must be used within a FilesContext.Provider');
  }
  return context;
}

const FilesContext = ({ children }:{children:React.ReactNode}) => {
  const [filesystem, setFilesystem] = useState<unknown[]>([]);

  const [files, setFiles] = useState<FilesDataInterface[]>([]);
  const [selectedIndexArr, setSelectedIndexArr] = useState<number[]>([]);
  
  const [userName, setuserName] = useState(localStorage.getItem("username") || "");
  const [courses, setCourses] = useState<CourseDataInterface[]>([])

  const toastMsg = (msg:string,type:("success"|"error")) => {
    if (type === "success") {
      toast.success(msg, {
        style: {
          border: '1px solid #3be8b0',
          padding: '16px',
          color: '#3be8b0',
          backgroundColor:"#313131"
        },
        iconTheme: {
          primary: '#3be8b0',
          secondary: '#FFFAEE',
        },
      });
      return true;
    }
    toast.error(msg, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
    
  }

  // loading states:
  const [loadHome, setLoadHome] = useState({
    isLoading:false,
    isFinished:false,
  });
  const [loadCourse, setLoadCourse] = useState({
    isLoading:false,
    isFinished:false,
  });

  return (
    <filesContext.Provider value={{
      files, setFiles,
      selectedIndexArr, setSelectedIndexArr,
      filesystem, setFilesystem,
      userName, setuserName,
      courses, setCourses,
      toastMsg,
      loadHome, setLoadHome,
      loadCourse, setLoadCourse
    }}>
      {children}
      <Toaster />
    </filesContext.Provider>
  )
}

export default FilesContext