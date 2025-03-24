import { usefileContext } from '../context/FilesContext';
import { UserCircle } from 'lucide-react';
import Button from '../components/Button';
import { clearData } from '../lib/db';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userName, toastMsg } = usefileContext();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (confirm("Are you sure to reset data? All files and playlist data will deleted!")) {
      await clearData();
      toastMsg("Data Reset!", "success");
      localStorage.clear();
      sessionStorage.clear();
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <div className='px-4 py-18'>
      <h1 className='text-xl font-bold mb-3'>Profile</h1>
      <div className="bg-emerald-600 rounded-xl lg:w-2/3">
        <div className="flex flex-col px-8 py-10 min-h-[60vh] gap-y-2">
          <h1 className="text-4xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50">
            <UserCircle className='w-20 h-20' />
          </h1>

          <span className='text-4xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50'>Hi {userName},</span>

          <h3 className='text-xl font-bold mt-3 underline'>About</h3>

          <p className='text-lg font-semibold leading-none sm:text-xl xl:max-w-3xl text-gray-50 mt-0'>
            Hi There! Iam vkr, I build this app for the students and working professionals to keep their learning resources and notes organised at single place.
            <br />
            <br />
            You can also convert Playlist to a course like structure to keep track of your learning progress!
            <br />
            <br />
            If you like the app, share to your friends too!
            <br />
            <a href={'https://github.com/iamvkr'} target='_blank' className='text-xs text-center md:text-start w-full md:w-auto inline-block underline mt-4'>Github</a>
          </p>

          <h3 className='text-xl font-bold mt-3 underline'>Add to Home screen</h3>

          <p className='text-lg font-semibold leading-none sm:text-xl xl:max-w-3xl text-gray-50 mt-0'>
          - Navigate to the URL in your browser, then tap the menu (usually three dots).
          <br/>
          <br/>
          - Select "Add to Home Screen" or a similar option.
          <br/>
          <br/>
          - Then Tap "Add" to confirm
          </p>

          <div className=' w-full mt-auto'>
            <Button className={"inline-block text-xl w-full bg-[#313131_!important] hover:bg-zinc-800! cursor-pointer text-white"}
              onClick={handleReset}>Reset Your Data</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile