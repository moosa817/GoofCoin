import { useState } from 'react';
import { FaCopy, FaEye } from 'react-icons/fa';

function AccountInfo({ username, balance, publicKey }) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(publicKey);
        alert('Public Key copied to clipboard');
    };

    return (
        <div className=" p-6">
            <hr className="modern-hr" />

            <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-primary">Account Info</h2>

                <div className="flex justify-around items-center">
                    {/* Username and Public Key Section */}
                    <div className="flex flex-col items-start mt-4">
                        {/* Username */}
                        <div className="flex items-center mb-2">
                            <p className="opacity-90 text-sm w-28">Username:</p>
                            <div className="text-lg font-semibold text-accent">{username}</div>
                        </div>

                        {/* Public Key */}
                        <div className="flex items-center">
                            <p className="opacity-90 text-sm w-28">Public Key:</p>
                            <a className="flex font-semibold text-accent cursor-pointer" onClick={() => setIsModalOpen(true)}>


                                VIEW PUBLIC KEY
                                <FaEye className="ml-1 text-accent text-xl hover:text-primary" />

                            </a>
                        </div>
                    </div>

                    {/* Balance Display */}
                    <div className="flex flex-col items-center mx-4">
                        <p className="opacity-90 text-lg">Balance</p>
                        <div className="transaction-no text-3xl font-semibold text-accent">{balance} Coins</div>
                    </div>
                </div>
            </div>


            <hr className="modern-hr my-8" />




            {/* Modal for Full Public Key */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-background p-8 rounded-lg shadow-lg text-center text-white max-w-lg mx-4">
                        <h3 className="text-xl text-primary font-semibold mb-4">Your Public Key</h3>
                        <pre className="whitespace-pre-wrap text-sm bg-gray-800 p-4 rounded-md mb-4 overflow-auto">
                            {publicKey}
                        </pre>
                        <button
                            onClick={handleCopy}
                            className="py-2 px-4 bg-primary rounded-lg text-background font-medium hover:bg-accent transition"
                        >
                            Copy Public Key
                            <FaCopy className="inline-block ml-2" />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="block mt-4 text-gray-400 hover:text-accent transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}

export default AccountInfo;
