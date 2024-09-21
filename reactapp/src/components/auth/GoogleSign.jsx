import React, { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { GoogleAuthenticate } from './GoogleAuth';
import { LoginContext } from './AuthContext';

const GoogleSignIn = ({ showButton }) => {
    const { isLogin, setisLogin, setisLoading } = useContext(LoginContext);

    const handleCredentialResponse = async (response) => {
        const decodedToken = jwtDecode(response.credential);
        const userId = decodedToken.sub;
        const email = decodedToken.email;
        const fullName = decodedToken.name;
        const picture = decodedToken.picture;

        setisLoading(true);
        const result = await GoogleAuthenticate(userId, fullName, email, picture);
        if (result === true) {
            setisLogin(true);
        }
    };

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: '255759854377-6nmes2bc0pqss6kusaqcmib1qh2p4n7o.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                // Render the button only if the container exists
                const buttonDiv = document.getElementById('buttonDiv');
                if (buttonDiv) {
                    window.google.accounts.id.renderButton(buttonDiv, {
                        theme: 'outline',
                        size: 'large',
                        width: 300,
                    });
                }

                // Prompt automatic sign-in suggestion (optional)
                window.google.accounts.id.prompt();
            } else {
                console.error('Google Sign-In script not loaded.');
            }
        };

        const intervalId = setInterval(() => {
            if (window.google && window.google.accounts) {
                clearInterval(intervalId);
                initializeGoogleSignIn();
            }
        }, 100); // Check every 100ms until the script is available

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    return (
        <div>
            {showButton && <div id="buttonDiv" className='mb-4'></div>}
        </div>
    );
};

export default GoogleSignIn;
