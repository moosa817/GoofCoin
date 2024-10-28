/* eslint-disable no-unused-vars */
import MyNav from "../components/navbar";
import { useContext, useState } from "react";
import { LoginContext } from "../components/auth/AuthContext";
import { Navigate, Link } from "react-router-dom";

import { config } from "../config";
const Setup = () => {
    const { isLogin, SetupCompleted, setSetupCompleted } = useContext(LoginContext);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [error, setError] = useState('');

    if (!isLogin || SetupCompleted) {
        return <Navigate to="/" />;
    }

    const handleDownload = async (e) => {
        //disable button
        e.target.disabled = true;
        e.target.innerText = 'Downloading...';

        try {
            const response = await fetch(`${config.API_URL}/api/setup/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',

                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to download the private key.");
            }

            // Convert response to blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'private_key.pem');
            document.body.appendChild(link);
            link.click();

            // Clean up and mark as downloaded
            link.parentNode.removeChild(link);
            e.target.innerText = 'Downloaded';
            setIsDownloaded(true);

            setTimeout(() => {
                setSetupCompleted(true);

            }, 3000);
        } catch (error) {
            e.target.disabled = false;
            e.target.innerText = 'Download Private Key';
            setError('Failed to download the private key. Please contact support if this issue persists.');
        }
    };

    return (
        <>
            <MyNav />
            <div className="flex flex-col items-center mt-20">
                <div className="w-full max-w-md p-6 rounded-lg shadow-2xl">
                    <h1 className="text-2xl font-bold  mb-4">Setup Your Account</h1>
                    <p className=" mb-4">
                        Download your private key to complete setup. <strong>You can only download it once.</strong>
                        Losing it means it’s gone forever, and not even the server administrator can retrieve it for you.<br></br>
                        <span className="font-thin">
                            Note: You Also get 1000 free credits to start with.
                        </span>
                    </p>

                    {error && (
                        <p className="text-red-600 mb-4">
                            {error}
                        </p>
                    )}

                    {isDownloaded ? (
                        <p className="text-green-400 font-medium">
                            Private key downloaded successfully. Setup complete!<br></br>

                        </p>
                    ) : (
                        <button
                            onClick={handleDownload}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Download Private Key
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Setup;
