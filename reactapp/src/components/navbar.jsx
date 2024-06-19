import LoginIcon from "@mui/icons-material/Login";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import { ModalContext } from './LoginPageContext';
import { useContext } from 'react';


export default function MyNav() {
    const { openModal } = useContext(ModalContext);

    return (
        <Navbar fluid rounded className="bg-background">
            <NavbarBrand href="/">
                <img src="/src/assets/imgs/header-logo.png" className="mr-3 h-14 sm:h-16" alt="Logo" />
            </NavbarBrand>
            <NavbarToggle className="text-white hover:scale-125 duration-500 hover:bg-transparent border-none" />
            <NavbarCollapse >
                <Link to="/" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white">Dashboard</Link>
                <Link to="/" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white">Dashboard</Link>
                <Link to="/" className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent hover:font-semibold duration-500 border-b-2 sm:border-b-0 p-3 sm:hover:bg-inherit hover:bg-accent hover:text-white">Dashboard</Link>
                <button onClick={openModal} className="text-base hover:scale-105 scale-105 sm:scale-100  sm:hover:text-accent font-semibold sm:border-b-0 duration-500 border-b-2 p-2 sm:hover:bg-inherit hover:bg-accent  "><LoginIcon />Login/Signup</button>
            </NavbarCollapse>
        </Navbar>
    );
}
