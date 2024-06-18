import Navbar from "./navbar";
import Bg from '../assets/imgs/bg.svg'
import { ModalContext } from './LoginPageContext';
import { useContext } from 'react';

const Header = () => {
    return (
        <header className=" bg-background h-[100vh]">

            <div className="absolute z-10">
                <div className=" my-24 text-center mx-auto w-11/12 md:w-3/4">
                    <div className="font-semibold text-xl md:text-3xl">

                        <h1 className="bg-gradient-to-r from-accent via-slate-200 to-primary inline-block text-2xl md:text-4xl text-transparent bg-clip-text ">GoofCoin:&nbsp;</h1>

                        The Cutting-Edge Prototype
                        for Showcasing Cryptocurrency Innovation!



                    </div>

                    <div className="flex justify-center">
                        <button className="p-2 sm:p-3 md:px-5 md:py-4 font-semibold sm:text-lg my-8 sm:mx-4 mx-4 shadow-2xl rounded-3xl bg-accent hover:scale-110 duration-700">Send Coin</button>
                        <button className="p-2 sm:p-3 border-accent border md:px-5 md:py-4 font-semibold sm:text-lg my-8 mx-3 sm:mx-4 shadow-2xl rounded-3xl hover:scale-110 duration-700 hover:bg-primary">Join Now</button>
                    </div>
                </div>
            </div>
            <div className="bg-primary w-48 h-48 absolute top-32 right-0 rounded-full blur-3xl"></div>

            <div className="bg-primary w-48 h-48 absolute bottom-32 left-0 rounded-full blur-3xl"></div>


            <div style={{ backgroundImage: "url(" + Bg + ")" }} className="absolute bottom-0 w-[100vw] h-72 md:h-60 bg-cover"></div>


        </header >


    );
};

export default Header