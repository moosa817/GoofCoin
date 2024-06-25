import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalContext } from './LoginPageContext';
import CloseIcon from '@mui/icons-material/Close';
import GuestIcon from '@mui/icons-material/PersonAdd';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'rgb(17 29 43)',
    p: 4,
    '@media (min-width: 768px)': {
        width: '50%',
    },
};

const TransitionWrapper = ({ children, transitionState }) => (
    <div className={`transition-all duration-500 ${transitionState ? 'opacity-100' : 'opacity-0'}`}>
        {children}
    </div>
);

const AuthForm = ({ isLoginPage, setLoginPage }) => (
    <div className="flex justify-center flex-col items-center transition-all duration-500">
        {isLoginPage ? (
            <>
                <button className="my-4 font-semibold hover:scale-110 duration-500 w-full sm:w-4/5 md:text-xl px-4 py-2 bg-gray-600">
                    <GuestIcon className="mr-2" />
                    Sign in as Guest
                </button>
                <span className="mb-4">OR</span>
            </>
        ) : (
            <h1 className="text-center font-semibold text-2xl my-4">Sign Up</h1>
        )}
        <form className="sm:w-4/5 w-full">
            {!isLoginPage && (
                <>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            autoComplete="name"
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            autoComplete="username"
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_username"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Username
                        </label>
                    </div>
                </>
            )}
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    autoComplete="email"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Email address
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="password"
                    autoComplete="current-password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Password
                </label>
            </div>
            {!isLoginPage && (
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        autoComplete="new-password"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_repassword"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Confirm Password
                    </label>
                </div>
            )}
            <button className="py-3 px-2 bg-primary w-full duration-500 rounded-sm hover:scale-105 font-semibold">
                {isLoginPage ? 'Login' : 'Sign Up'}
            </button>
        </form>
    </div>
);

export default function LoginModal() {
    const { isModalOpen, closeModal } = React.useContext(ModalContext);
    const [isLoginPage, setLoginPage] = React.useState(true);
    const [transitionState, setTransitionState] = React.useState(false);

    React.useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => setTransitionState(true), 0);
        } else {
            setTransitionState(false);
        }
    }, [isModalOpen]);

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <div> {/* Wrap the TransitionWrapper component with a div */}
                <TransitionWrapper transitionState={transitionState}>
                    <Box sx={style}>
                        <div className="font-semibold absolute top-2 right-2 hover:scale-110 duration-500 hover:font-bold">
                            <button onClick={closeModal}><CloseIcon /></button>
                        </div>
                        <div className="flex shadow-xl my-2">
                            <div
                                onClick={() => setLoginPage(true)}
                                className={`w-1/2 text-center border hover:scale-105 hover:cursor-pointer p-3 hover:font-semibold hover:bg-primary duration-500 ${isLoginPage ? 'active-login' : ''}`}
                            >
                                Login
                            </div>
                            <div
                                onClick={() => setLoginPage(false)}
                                className={`w-1/2 text-center border hover:scale-105 hover:cursor-pointer p-3 hover:font-semibold hover:bg-primary duration-500 ${!isLoginPage ? 'active-login' : ''}`}
                            >
                                Signup
                            </div>
                        </div>
                        <AuthForm isLoginPage={isLoginPage} setLoginPage={setLoginPage} />
                    </Box>
                </TransitionWrapper>
            </div>
        </Modal>
    );
}
