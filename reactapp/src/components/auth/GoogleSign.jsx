import React, { useEffect, useContext, useRef } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { GoogleAuthenticate } from './GoogleAuth'; // Import your authentication function
import { LoginContext } from './AuthContext'; // Import your context

const GoogleSignIn = ({ showButton }) => {
    const { isLogin, setisLogin, setisLoading } = useContext(LoginContext);
    const buttonRef = useRef(null); // Use ref for the button container

    // Handle the Google Sign-In response
    const handleCredentialResponse = async (response) => {
        try {
            // Decode the JWT from Google Sign-In
            const decodedToken = jwtDecode(response.credential);
            const { sub: userId, email, name: fullName, picture } = decodedToken;

            // Set loading state and attempt authentication
            setisLoading(true);
            const result = await GoogleAuthenticate(userId, fullName, email, picture);

            // Update login state if authentication is successful
            if (result) setisLogin(true);
        } catch (error) {
            console.error('Error handling credentials:', error);
        } finally {
            setisLoading(false);
        }
    };

    // Initialize Google Sign-In
    const initializeGoogleSignIn = () => {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: '255759854377-6nmes2bc0pqss6kusaqcmib1qh2p4n7o.apps.googleusercontent.com', // Replace with your client ID
                callback: handleCredentialResponse,
            });

            // Render the button inside the ref container
            if (buttonRef.current) {
                window.google.accounts.id.renderButton(buttonRef.current, {
                    theme: 'outline',
                    size: 'large',
                    width: 300,
                });
            }

            // Optional: Automatically prompt for sign-in
            window.google.accounts.id.prompt();
        } else {
            console.error('Google Sign-In library not loaded.');
        }
    };

    // Dynamically load the Google Sign-In script and initialize
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;

        script.onload = initializeGoogleSignIn; // Initialize once script is loaded
        document.body.appendChild(script);

        return () => {
            // Clean up the script on component unmount
            document.body.removeChild(script);
        };
    }, []); // Run only once

    return (
        <div>
            {showButton && (
                <div ref={buttonRef} className="mb-4"></div> // Attach the ref for button rendering
            )}
        </div>
    );
};

export default GoogleSignIn;
