import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLogin, setisLogin] = useState(false);

    return (
        <LoginContext.Provider value={{ isLogin, setisLogin }}>
            {children}
        </LoginContext.Provider>
    );
};
