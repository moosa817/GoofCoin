import LoginIcon from '@mui/icons-material/Login';
import { useContext } from 'react';
import { ModalContext } from './LoginPageContext';
import Logo from '../assets/imgs/header-logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <nav className="bg-background">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-16" alt=" Logo" />

                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 hover:scale-110 duration-150 justify-center text-sm text-gray-300 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">
                        <li>
                            <Link to="/" className="block py-2 px-3 md:p-0 md:border-b-0 border-b-2 hover:text-accent hover:scale-105 duration-300 hover:font-semibold" aria-current="page">Dashboard</Link>
                        </li>

                        <li>
                            <Link to="/blockchain" className="block py-2 px-3 md:p-0 md:border-b-0 border-b-2 hover:text-accent hover:scale-105 duration-300 hover:font-semibold" aria-current="page">Blockchain</Link>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 md:border-b-0 border-b-2 hover:text-accent hover:scale-105 duration-300 hover:font-semibold" aria-current="page">My Transaction</a>
                        </li>

                        <li>
                            <button onClick={openModal} className="block py-2 px-3 md:p-0 md:border-b-0 border-b-2 hover:text-accent hover:scale-105 duration-300 hover:font-semibold hover:cursor-pointer" aria-current="page"> <LoginIcon />&nbsp;Login/Signup</button>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
