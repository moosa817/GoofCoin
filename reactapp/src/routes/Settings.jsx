import Navbar from "../components/navbar"
import { LoginContext } from "../components/auth/AuthContext"
import { useContext, useState } from "react"
import { ModalContext } from "../components/ModalsContext"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AccountBoxRounded, Lock } from "@material-ui/icons"
import { DangerAlert } from "../components/alerts"
import ChangePassword from "../components/auth/ChangePassword"
import ChangeProfile from "../components/auth/ChangeProfile"
const Settings = () => {
    const { Name, Username, Email, Pfp, isLogin, isGuest, IsGoogle } = useContext(LoginContext);
    const { openModal, setConvertOpenModal } = useContext(ModalContext);

    const [page, setPage] = useState('account');

    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
        if (isGuest) {
            setConvertOpenModal(true);
        }
    }, [isLogin, openModal]);

    let pfp = Pfp ? Pfp : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Name}&hair=short01&size=50`;
    if (isGuest) {
        return <Navigate to="/" />;
    }

    if (!isLogin) {
        return <Navigate to="/" />;
    }



    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center flex-col">
                <div className="relative w-32 my-4 hover:opacity-50">
                    <img
                        src={pfp}
                        alt="Profile Picture"
                        className="rounded-full w-full transition-all duration-300 filter"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white text-md font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                        Upload Photo
                    </div>
                </div>
                <div className="text-2xl">{Name}</div>
                <div className="text-lg font-semibold">{Username}</div>
            </div>
            <div className="flex justify-center">
                <hr className="bg-slate-400 w-full sm:w-3/4 opacity-25"></hr>
            </div>
            <div className="flex justify-center gap-4 my-12 text-xs sm:text-md">
                <div onClick={() => setPage('account')} className={page === 'account' ? "settings-link border-b-2" : "settings-link opacity-50"}>
                    <AccountBoxRounded />Account Information
                </div>

                {IsGoogle ? '' :
                    <div onClick={() => setPage('password')} className={page === 'password' ? "settings-link border-b-2" : "settings-link opacity-50"}>
                        <Lock />Change Password
                    </div>}
            </div>

            {page === 'account' ? (
                <div className="flex justify-center items-center flex-col">
                    <div className="sm:w-1/2 fadeIn flex justify-center items-center flex-col">
                        <div className="sm:text-2xl text-xl">Account Information</div>
                        <hr className="bg-slate-400 w-full sm:w-3/4 opacity-25 mb-4"></hr>
                        <ChangeProfile username={Username} email={Email} name={Name} />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col">
                    <div className="sm:w-1/2 fadeIn flex justify-center items-center flex-col">
                        <div className="sm:text-2xl text-xl">Change Password</div>
                        <hr className="bg-slate-400 w-full sm:w-3/4 opacity-25 mb-4"></hr>
                        <ChangePassword />

                    </div>
                </div>
            )}
        </>
    );
}

export default Settings;
