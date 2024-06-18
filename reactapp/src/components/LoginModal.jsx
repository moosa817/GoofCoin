import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalContext } from './LoginPageContext';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: "rgb(17 29 43)",
    p: 4,

    // add media query for responsiveness
    '@media (min-width: 768px)': {
        width: '50%'
    }
};

export default function LoginModal() {
    const { isModalOpen, closeModal } = React.useContext(ModalContext);
    const [LoginPage, setLoginPage] = React.useState(true); //islogin page or register
    const [transitionState, setTransitionState] = React.useState(false);

    React.useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => setTransitionState(true), 0); // Start transition after mount
        } else {
            setTransitionState(false);
        }
    }, [isModalOpen]);


    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={`transition-all duration-500 ${transitionState ? 'opacity-100' : 'opacity-0'}`}>
                    <Box sx={style}>
                        <div className="font-semibold absolute top-2 right-2 hover:scale-110 duration-500 hover:font-bold">
                            <button onClick={closeModal}><CloseIcon /></button>
                        </div>
                        <div className="flex shadow-xl my-2">
                            <div onClick={() => { setLoginPage(true) }} className={"w-1/2 text-center border hover:scale-105 hover:cursor-pointer p-3 hover:font-semibold hover:bg-primary duration-500 " + (LoginPage ? "active-login" : "")}>Login</div>
                            <div onClick={() => { setLoginPage(false) }} className={"w-1/2 text-center border hover:scale-105 hover:cursor-pointer p-3 hover:font-semibold hover:bg-primary duration-500 " + (!LoginPage ? "active-login" : "")}>Signup</div>
                        </div>
                        <div className="transition-all duration-1000">

                            {LoginPage ? (
                                <div className='flex justify-center flex-col items-center'>
                                    <button className="my-4 font-semibold  hover:scale-110 duration-500 w-full sm:w-4/5 md:text-xl px-4 py-2 bg-gray-600">Sign in as Guest</button>


                                    <span className='mb-4'>OR</span>

                                    <form className="sm:w-4/5 w-full">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" autoComplete="email" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username / Email address</label>
                                        </div>

                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="password" autoComplete="current-password" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                        </div>

                                        <button className="py-3 px-2 bg-primary w-full duration-500 rounded-sm hover:scale-105 font-semibold">Login</button>
                                    </form>
                                </div>
                            ) : (
                                <form>
                                    {/* Register form fields */}
                                </form>
                            )}
                        </div>
                    </Box>
                </div>
            </Modal>
        </div>
    );
}
