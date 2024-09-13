import React, { createContext, useState } from 'react';
import Loading from '../Loading';
import TokenVerify from './TokenVerify';



export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLogin, setisLogin] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [isGuest, setisGuest] = useState(false);
    const [Pfp, setPfp] = useState('');
    const [PublicKey, setPublicKey] = useState('');
    const [Balance, setBalance] = useState(0);
    const [UserId, setUserId] = useState(null);
    const [IsGoogle,setIsGoogle] = useState(false);


    return (
        <LoginContext.Provider value={{ isLogin, setisLogin, Name, setName, Email, setEmail, Username, setUsername, isLoading, setisLoading, isGuest, setisGuest, Pfp, setPfp, PublicKey, setPublicKey, Balance, setBalance, setUserId, UserId ,IsGoogle,setIsGoogle}}>

            <TokenVerify />
            {isLoading ? <Loading /> : children}
        </LoginContext.Provider>
    );
};
