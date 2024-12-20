import { Modal } from "flowbite-react";
import { useContext, useState, useRef } from "react";
import { ModalContext } from "../ModalsContext";
import { ConvertGuest } from "./ConvertGuestApi";
import { LoginContext } from "./AuthContext";
import CloseIcon from '@mui/icons-material/Close';
const LoadingSvg = (text) => {
    return (`<div role="status" class="flex items-center justify-center">
    <svg aria-hidden="true" class="inline w-6 h-6 text-white animate-spin  fill-gray-300 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="mx-1">${text}...</span>
        </div>`)
}

export default function GuestConvertModal() {
    const { openConvertModal, setConvertOpenModal
    } = useContext(ModalContext);

    const { UserId, setisLogin, setUsername, setisLoading } = useContext(LoginContext);

    const [signupName, setSignupName] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupRePassword, setSignupRePassword] = useState('');

    const isSignupFormValid = signupName && signupUsername && signupEmail && signupPassword && signupRePassword && signupPassword === signupRePassword;

    const pwdError = useRef(null);
    const UsernameError = useRef(null);
    const EmailError = useRef(null);
    const handleSignupNameChange = (e) => {
        setSignupName(e.target.value);
    };

    const handleSignupUsernameChange = (e) => {
        setSignupUsername(e.target.value);
    };

    const handleSignupEmailChange = (e) => {
        setSignupEmail(e.target.value);
    };

    const handleSignupPasswordChange = (e) => {
        setSignupPassword(e.target.value);
    };

    const handleSignupRePasswordChange = (e) => {
        if (e.target.value !== signupPassword) {
            // toggle class
            pwdError.current.innerHTML = "Passwords Do Not Match";
        } else {
            pwdError.current.innerHTML = "";

        }

        setSignupRePassword(e.target.value);
    };

    const HandleSignup = async (e) => {
        e.preventDefault();
        UsernameError.current.innerHTML = "";
        EmailError.current.innerHTML = "";
        pwdError.current.innerHTML = "";
        //change button value
        e.target.disabled = true;
        e.target.innerHTML = LoadingSvg('Signing Up');
        const result = await ConvertGuest(UserId, signupName, signupUsername, signupEmail, signupPassword);

        if (result === true) {
            setConvertOpenModal(false);
            setisLoading(true);
            setUsername('');
            setisLogin(false);

        } else {

            if (result.username) {
                UsernameError.current.innerHTML = result.username;
            }
            if (result.email) {
                EmailError.current.innerHTML = result.email;
            }
            if (result.password) {
                //each error in new line with br
                pwdError.current.innerHTML = result.password.join('<br>');
            }
        }
        e.target.disabled = false;
        e.target.innerHTML = 'Sign Up';

    }
    return (
        <>
            <Modal show={openConvertModal} onClose={() => setConvertOpenModal(false)} size="md">
                <Modal.Body className="bg-gray-800 text-white">
                    <div className="my-4">
                        <div className="flex justify-around" ><div className="text-center text-xl font-semibold">Convert Guest To Member</div><CloseIcon onClick={() => { setConvertOpenModal(false) }} className="hover:cursor-pointer" /></div>


                    </div>

                    <form className="w-full">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                autoComplete="name"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={signupName}
                                onChange={handleSignupNameChange}
                                required
                            />
                            <label
                                htmlFor="floating_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Name
                            </label>
                        </div>


                        <div className="relative z-0 w-full mb-2 group">
                            <input
                                type="text"
                                autoComplete="username"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={signupUsername}
                                onChange={handleSignupUsernameChange}
                                required
                            />
                            <label
                                htmlFor="floating_username"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Username
                            </label>
                        </div>
                        <div className='text-xs text-red-600 mb-3' ref={UsernameError}>
                        </div>
                        <div className="relative z-0 w-full mb-2 group">
                            <input
                                type="email"
                                autoComplete="email"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={signupEmail}
                                onChange={handleSignupEmailChange}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                        </div>
                        <div className='text-xs text-red-600 mb-3' ref={EmailError}>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={signupPassword}
                                onChange={handleSignupPasswordChange}
                                required
                            />
                            <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                        </div>
                        <div className="relative z-0 w-full my-5 group">
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={signupRePassword}
                                onChange={handleSignupRePasswordChange}
                                required
                            />
                            <label
                                htmlFor="floating_repassword"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Confirm Password
                            </label>

                            <span className="text-xs text-red-700 font-semibold" ref={pwdError}></span>
                        </div>
                        <button onClick={HandleSignup}
                            className={`py-3 px-2 w-full duration-500 rounded-sm font-semibold ${isSignupFormValid ? 'bg-primary hover:scale-105' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!isSignupFormValid}
                        >
                            Sign Up
                        </button>

                    </form>
                </Modal.Body>

            </Modal >
        </>
    );
}
