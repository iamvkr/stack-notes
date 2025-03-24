import { Home, ListPlus, UserCircle } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const BottomBar = () => {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    return (
        <>
            {/* FOR MOBILE DEVICE */}
            <div className={`lg:hidden h-16 fixed bottom-0 left-0 w-full bg-dark-bg`}>

                <div className="grid grid-cols-3">
                    <div className={`${pathname === "/" && "border-t-2 bg-primary/45"}`} onClick={() => { navigate("/") }}>
                        <div className="itemBox flex flex-col justify-center items-center h-16">
                            <Home />
                            <h5>Home</h5>
                        </div>
                    </div>
                    <div className={`${pathname === "/course" && "border-t-2 bg-primary/45"}`} onClick={() => { navigate("/course") }}>
                        <div className="itemBox flex flex-col justify-center items-center h-16">
                            <ListPlus />
                            <h5>Course</h5>
                        </div>
                    </div>
                    <div className={`${pathname === "/profile" && "border-t-2 bg-primary/45"}`} onClick={() => { navigate("/profile") }}>
                        <div className="itemBox flex flex-col justify-center items-center h-16">
                            <UserCircle />
                            <h5>Profile</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* for lg devices */}
            <div className={`hidden lg:block h-[calc(100vh_-_4rem)] fixed bottom-0 left-0 w-20 bg-dark-bg`}>

                <div className="grid grid-cols-1 w-20">
                    <div className={`${pathname === "/" && "border-t-2 bg-primary/45"}`} onClick={() => { navigate("/") }}>
                        <div className="itemBox flex flex-col justify-center items-center h-16 cursor-pointer">
                            <Home />
                            <h5>Home</h5>
                        </div>
                    </div>
                    <div className={`${pathname === "/course" && "border-t-2 bg-primary/45"}`} onClick={() => { navigate("/course") }}>
                        <div className="itemBox flex flex-col justify-center items-center h-16 cursor-pointer">
                            <ListPlus />
                            <h5>Course</h5>
                        </div>
                    </div>
                    <div className={`${pathname === "/profile" && "border-t-2 bg-primary/45"}`} onClick={() => { navigate("/profile") }}>
                        <div className="itemBox flex flex-col justify-center items-center h-16 cursor-pointer">
                            <UserCircle />
                            <h5>Profile</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomBar