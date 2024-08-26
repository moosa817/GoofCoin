import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import { ModalContext } from './ModalsContext';
import { useContext } from 'react';
import { LoginContext } from "./auth/AuthContext"
import { Dropdown } from "flowbite-react";
import { HiCog, HiUserAdd, HiLogout, HiUserCircle } from "react-icons/hi";
import GuestConvertModal from "./auth/ConvertModal";


export default function MyNav() {
    const { openModal, setConvertOpenModal } = useContext(ModalContext);
    const { isLogin, Pfp, Username, Name, isGuest } = useContext(LoginContext);

    let link = `/profile/${Username}`;

    let pfp;
    if (Pfp) {
        pfp = Pfp;
    }
    else {
        pfp = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Name}&hair=short01&size=50`
    }
    return (
        <>
            {isGuest ? <GuestConvertModal /> : ''}
            < Navbar fluid rounded className="bg-background mr-3 overflow-hidden" >
                <NavbarBrand href="/">
                    <img src="/src/assets/imgs/header-logo.png" className="mr-3 h-14 sm:h-16" alt="Logo" />
                </NavbarBrand>
                <NavbarToggle className="text-white hover:scale-125 duration-500 hover:bg-transparent border-none" />
                <NavbarCollapse >
                    <Link to="/dashboard" className="text-base  sm:scale-100 sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white hover:scale-105">Dashboard</Link>

                    <Link to="/transactions" className="text-base  sm:scale-100 sm:hover:text-accent hover:font-semibold duration-500 border-b-2 p-3 sm:border-b-0 sm:hover:bg-inherit hover:bg-accent hover:text-white hover:scale-105">My Transactions</Link>
                    <Link to="/blockchain" className="text-base sm:scale-100 sm:hover:text-accent hover:font-semibold duration-500 border-b-2 sm:border-b-0 p-3 sm:hover:bg-inherit hover:bg-accent hover:text-white hover:scale-105">BlockChain</Link>
                    {isLogin ?
                        <div className="mr-4">
                            <Dropdown
                                className="mr-4"
                                renderTrigger={() => (
                                    <img className="rounded-full w-12 border-2 border-blue-500 h-auto hover:cursor-pointer hover:grayscale hover:scale-105" src={pfp} alt="pfp"></img>
                                )}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{Name}</span>
                                    <span className="block truncate text-sm font-medium mr-10">{Username}</span>
                                </Dropdown.Header><Link to={link} >
                                    <Dropdown.Item icon={HiUserCircle}>Profile</Dropdown.Item></Link>
                                <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                                {isGuest ? <Dropdown.Item icon={HiUserAdd} onClick={() => { setConvertOpenModal(true) }}>Convert Account</Dropdown.Item> : <></>}

                                <Dropdown.Divider /><Link to="/logout">
                                    <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item></Link>
                            </Dropdown>
                        </div>
                        :
                        <button onClick={openModal} className="text-base hover:scale-105 sm:scale-100 sm:hover:text-accent font-semibold sm:border-b-0 duration-500 border-b-2 p-2 sm:hover:bg-inherit hover:bg-accent"><LoginIcon />Login/Signup</button>}
                </NavbarCollapse>
            </Navbar >
        </>
    );
}
