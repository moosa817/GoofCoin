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

                <div className="flex sm:justify-around items-center">
                    {/* Username and Public Key Section */}
                    <div className="flex flex-col items-start mt-4">
                        {/* Username */}
                        <div className="flex items-center mb-2">
                            <p className="opacity-90 text-xs sm:text-sm w-20 sm:w-28">Username:</p>
                            <div className="text-sm sm:text-lg font-semibold text-accent">{username}</div>
                        </div>

                        {/* Public Key */}
                        <div className="flex items-center">
                            <p className="opacity-90 text-xs sm:text-sm w-20 sm:w-28">Public Key:</p>
                            <a className="flex font-semibold text-accent cursor-pointer text-xs sm:text-sm mt-1" onClick={() => setIsModalOpen(true)}>


                                VIEW PUBLIC KEY
                                <FaEye className="sm:ml-1 text-accent text-lg sm:text-xl hover:text-primary" />

                            </a>
                        </div>
                    </div>

                    {/* Balance Display */}
                    <div className="flex flex-col items-center ml-6">
                        <p className="opacity-90 sm:text-lg">Balance</p>
                        <div className="transaction-no lg:text-3xl md:text-xl text-lg  font-semibold text-accent">{balance} Coins</div>
                    </div>
                </div>
            </div>


            <hr className="modern-hr my-8" />




            {/* Modal for Full Public Key */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-background p-6 sm:p-8 rounded-lg shadow-lg text-center text-white w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
                        <h3 className="text-lg sm:text-xl text-primary font-semibold mb-4">
                            Your Public Key
                        </h3>
                        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-gray-800 p-3 sm:p-4 rounded-md mb-4 overflow-auto max-h-60 sm:max-h-72">
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
