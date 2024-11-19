/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ModalContext } from '../ModalsContext';
import CloseIcon from '@mui/icons-material/Close';
import AuthForm from './AuthForm';


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
                                className={`w-1/2 text-center border hover:scale-105 hover:cursor-pointer p-3 hover:font-semibold hover:bg-primary duration-500 ${isLoginPage ? 'bg-primary' : ''}`}
                            >
                                Login
                            </div>
                            <div
                                onClick={() => setLoginPage(false)}
                                className={`w-1/2 text-center border hover:scale-105 hover:cursor-pointer p-3 hover:font-semibold hover:bg-primary duration-500 ${!isLoginPage ? 'bg-primary' : ''}`}
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
