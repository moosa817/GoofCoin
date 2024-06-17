import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    const [isLogin, setisLogin] = React.useState(false); //islogin or register


    const toggleMode = () => setisLogin(!isLogin);

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <div className='bg-primary'>

                    <Box sx={style}>


                        <div className=" font-semibold absolute top-2 right-2 hover:scale-110 duration-500 hover:font-bold">
                            <button onClick={closeModal}><CloseIcon /></button>
                        </div>



                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {isLogin ? 'Login' : 'Register'}
                        </Typography>
                        {isLogin ? (
                            <form>
                                {/* Login form fields */}
                            </form>
                        ) : (
                            <form>
                                {/* Register form fields */}
                            </form>
                        )}
                        <Button onClick={toggleMode}>
                            {isLogin ? 'Switch to Register' : 'Switch to Login'}
                        </Button>

                    </Box>
                </div>
            </Modal>
        </div >
    );
}
