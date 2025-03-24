import { useState } from 'react'
import Button from '../Button';
import { usefileContext } from '../../context/FilesContext';

const UsernameModal = ({ isOpenUserModal, setisOpenUserModal }: { isOpenUserModal: boolean, setisOpenUserModal: (isOpen: boolean) => void }) => {
  const [itemName, setItemName] = useState("");
  const { setuserName, toastMsg } = usefileContext();

  const saveUser = () => {
    if (!itemName.trim()) {
      toastMsg("cannot be empty", "error");
      return false;
    }
    setuserName(itemName);
    localStorage.setItem("username", itemName);
    toastMsg("Success!", "success")
  }

  return (isOpenUserModal &&
    <div className='fixed top-0 left-0 w-full h-screen bg-dark-bg/70 flex items-center justify-center '
      onClick={() => { setisOpenUserModal(!isOpenUserModal) }}>
      <div className={`modal w-[85%]  border bg-dark-bg rounded-2xl p-4 animate-enter md:w-1/3 md:h-60`} onClick={(e) => { e.stopPropagation() }}>
        <form onSubmit={(e) => { e.preventDefault() }}>
          <h2 className='text-xl font-bold mb-4'>Let's Get Started!</h2>
          <div className='my-2'>
            <input value={itemName} onChange={(e) => { setItemName(e.target.value) }} type="text"
              className='h-10 w-full border rounded-md ps-2 outline-none'
              placeholder='Enter a Username'
            />
          </div>
          <Button className={"block ms-auto mt-4"} onClick={saveUser}>Get Started</Button>
        </form>
      </div>
    </div>
  )
}

export default UsernameModal