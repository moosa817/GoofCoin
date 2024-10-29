/* eslint-disable no-unused-vars */
import Navbar from "../components/navbar"
import { LoginContext } from "../components/auth/AuthContext"
import { useContext, useState } from "react"
import { ModalContext } from "../components/ModalsContext"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { DangerAlert, SuccessAlert } from "../components/alerts"
import ChangePassword from "../components/auth/ChangePassword"
import ChangeProfile from "../components/auth/ChangeProfile"
import { useRef } from "react"
import { handleUpload } from "../components/auth/ChangePfp"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const Settings = () => {
    const { Name, Username, Email, Pfp, isLogin, isGuest, IsGoogle, setPfp } = useContext(LoginContext);
    const { openModal, setConvertOpenModal } = useContext(ModalContext);

    const [page, setPage] = useState('account');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
        if (isGuest) {
            setConvertOpenModal(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, openModal]);

    let pfp = Pfp ? Pfp : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Name}&hair=short01&size=50`;
    if (isGuest) {
        return <Navigate to="/" />;
    }

    if (!isLogin) {
        return <Navigate to="/" />;
    }


    //change image logic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fileInputRef = useRef(null);
    const handleFileChange = async (event) => {

        document.getElementById('LoadingSpinner').classList.remove('opacity-0');
        document.getElementById('LoadingSpinner').classList.add('opacity-50');

        const file = fileInputRef.current.files[0]

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPfp(imageUrl);
            const result = await handleUpload(file);



            document.getElementById('LoadingSpinner').classList.remove('opacity-50');
            document.getElementById('LoadingSpinner').classList.add('opacity-0');
            if (result === true) {
                setSuccessMsg("Image uploaded successfully");

            } else {
                setErrorMsg("Failed to upload image");
            }
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the hidden input click
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center flex-col">
                <div className="relative w-32 my-4 hover:opacity-50">
                    {errorMsg != '' ? <DangerAlert msg={errorMsg} /> : null}
                    {successMsg != '' ? <SuccessAlert msg={successMsg} /> : null}
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    {/* Profile picture */}
                    <img
                        src={pfp} alt="Profile Picture"
                        className="rounded-full w-full transition-all duration-300 filter h-32 object-cover"
                    />
                    <div id="LoadingSpinner" className="rounded-full saturate-150 absolute inset-0 flex items-center justify-center text-white text-md font-semibold duration-300 hover:cursor-pointer bg-gray-300 opacity-0" >
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-md font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer" onClick={handleImageClick}>
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
                    <AccountCircleIcon />Account Information
                </div>

                {IsGoogle ? '' :
                    <div onClick={() => setPage('password')} className={page === 'password' ? "settings-link border-b-2" : "settings-link opacity-50"}>
                        <LockIcon />Change Password
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
