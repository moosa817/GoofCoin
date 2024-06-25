import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import { ModalContext } from './LoginPageContext';
import { useContext } from 'react';
import { LoginContext } from "../components/AuthContext"


export default function MyNav() {
    const { openModal } = useContext(ModalContext);
    const { isLogin } = useContext(LoginContext);

    return (
        <Navbar fluid rounded className="bg-background">
            <NavbarBrand href="/">
                <img src="/src/assets/imgs/header-logo.png" className="mr-3 h-14 sm:h-16" alt="Logo" />
            </NavbarBrand>
            <NavbarToggle className="text-white hover:scale-125 duration-500 hover:bg-transparent border-none" />
            <NavbarCollapse >
                <Link to="/dashboard" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white">Dashboard</Link>
                <Link to="/transactions" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white">My Transactions</Link>
                <Link to="/blockchain" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 sm:border-b-0 p-3 sm:hover:bg-inherit hover:bg-accent hover:text-white">BlockChain</Link>

                {isLogin ?
                    <Link to="/logout" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white"><LogoutIcon />Logout</Link>
                    :
                    <button onClick={openModal} className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent font-semibold sm:border-b-0 duration-500 border-b-2 p-2 sm:hover:bg-inherit hover:bg-accent  "><LoginIcon />Login/Signup</button>}

            </NavbarCollapse>
        </Navbar>
    );
}
