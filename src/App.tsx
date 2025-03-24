import PWABadge from './PWABadge.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.tsx'
import Home from './pages/Home.tsx'
import Course from './pages/Course.tsx'
import Profile from './pages/Profile.tsx'
import Navbar from './components/Navbar.tsx'
import BottomBar from './components/BottomBar.tsx'
import FileView from './pages/FileView.tsx'
import { usefileContext } from './context/FilesContext.tsx'
import OpenFile from './pages/OpenFile.tsx'
import PlayCourse from './pages/PlayCourse.tsx'

function App() {
  const { userName } = usefileContext();

  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/files/*" element={<FileView />} />
          <Route path="/openFile/:id" element={<OpenFile />} />
          <Route path='/course' element={<Course />} />
          <Route path='/course/:pid' element={<PlayCourse />} />
        </Routes>
        {userName && <BottomBar />}
      </Layout>
      <PWABadge />
    </BrowserRouter>
  )
}

export default App
