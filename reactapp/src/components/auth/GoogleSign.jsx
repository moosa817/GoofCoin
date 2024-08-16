import React, { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { GoogleAuthenticate } from './GoogleAuth';
import { LoginContext } from './AuthContext';


const GoogleSignIn = () => {
    const { isLogin, setisLogin, setisLoading } = useContext(LoginContext);


    const handleCredentialResponse = async (response) => {
        console.log('Encoded JWT ID token: ' + response.credential);

        // Decode the JWT token to extract user information
        const decodedToken = jwtDecode(response.credential);
        console.log('Decoded Token:', decodedToken);

        // Extract user information
        const userId = decodedToken.sub;
        const email = decodedToken.email;
        const fullName = decodedToken.name;
        const picture = decodedToken.picture;

        setisLoading(true);
        const result = await GoogleAuthenticate(userId, fullName, email, picture);


        if (result === true) {
            console.log("trueee")
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

                window.google.accounts.id.renderButton(
                    document.getElementById('buttonDiv'),
                    { theme: 'outline', size: 'large' }
                );

                window.google.accounts.id.prompt();
            } else {
                console.error('Google Sign-In script not loaded.');
            }
        };

        // Wait for the Google API script to be available
        if (window.google && window.google.accounts) {
            initializeGoogleSignIn();
        } else {
            const intervalId = setInterval(() => {
                if (window.google && window.google.accounts) {
                    clearInterval(intervalId);
                    initializeGoogleSignIn();
                }
            }, 100); // Check every 100ms
        }
    }, []);

    return (
        <div>
            <div id="buttonDiv"></div>

        </div>
    );
};

export default GoogleSignIn;