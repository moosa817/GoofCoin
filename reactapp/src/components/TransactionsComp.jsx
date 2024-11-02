import React, { useState } from 'react';

const ForwardArrow = () => (
    <svg
        style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            zIndex: '10',
            right: '-14%',
            bottom: '35%',
            fill: '#74f2cc'
        }}
        className="hidden sm:block absolute"
        viewBox="0 0 476.213 476.213"
        xmlns="http://www.w3.org/2000/svg"
    >
        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
	57.427,253.107 476.213,253.107" />
    </svg>
);

const LinkArrow = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="70.9041 9.2774 382.8843 428.6662"
        style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            zIndex: '10',
            right: '-5%',
            bottom: '-16%',
            fill: '#74f2cc'
        }}
        className="absolute sm:hidden"
    >
        <path
            d="M 58.748 -99.757 L 58.68 -90.149 C 85.558 -89.709 142.077 -54.364 141.92 -31.966 C 141.763 -9.567 150.223 82.117 123.346 81.677 L 32.164 87.547 L 66.486 59.108 L 61.117 54.52 L 17.908 89.715 L 60.852 126.62 L 66.284 122.209 L 32.899 95.711 L 126.652 91.86 C 157.61 92.367 149.102 -4.943 149.315 -35.276 C 149.528 -65.61 89.707 -99.25 58.748 -99.757 Z"
            transform="matrix(2.893573045731, 0, 0, -1.893594026566, 179.007694506083, 209.011438055521)"
        />
    </svg>
);

const TransactionBox = ({ transactions }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full sm:gap-3 justify-center overflow-x-hidden">
            {transactions.map((transaction, index) => (
                <SingleTransaction key={transaction.id} transaction={transaction} isLast={index === transactions.length - 1} />
            ))}
        </div>
    );
};

const SingleTransaction = ({ transaction, isLast }) => {
    const [isPublicKeyModalOpen, setIsPublicKeyModalOpen] = useState(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

    const togglePublicKeyModal = () => setIsPublicKeyModalOpen(!isPublicKeyModalOpen);
    const toggleSignatureModal = () => setIsSignatureModalOpen(!isSignatureModalOpen);

    const formattedTime = new Date(transaction.timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="transaction-box w-[90%] p-3 bg-[#2a316d] text-white rounded-lg shadow-lg relative border border-[#50acf7] shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-lg font-semibold mb-1 text-[#50acf7]">Transaction Details</h3>
            <div className="transaction-detail mb-1">
                <span className="font-medium text-[#74f2cc]">Sender:</span> {transaction.sender_username}
            </div>
            <div className="transaction-detail mb-1">
                <span className="font-medium text-[#74f2cc]">Receiver:</span> {transaction.recipient_username}
            </div>
            <div className="transaction-detail mb-1">
                <span className="font-medium text-[#50acf7] text-xl">Amount:</span> <span className="text-xl font-bold text-[#74f2cc]">{transaction.amount} Coins</span>
            </div>
            <div className="transaction-detail mb-1 text-sm text-gray-400">
                <span className="font-medium">Time:</span> {formattedTime}
            </div>
            <div className="transaction-detail mb-1">
                <span className="font-medium text-[#74f2cc]">Signature:</span>{' '}
                <button onClick={toggleSignatureModal} className="text-[#50acf7] underline hover:text-[#74f2cc]">
                    View Signature
                </button>
            </div>
            <button
                className="mt-2 bg-[#144185] text-white p-1 px-3 rounded shadow hover:bg-[#50acf7] text-sm transition"
                onClick={togglePublicKeyModal}
            >
                Show Public Keys
            </button>

            {!isLast && <ForwardArrow />}
            <LinkArrow />

            {/* Public Keys Modal */}
            {isPublicKeyModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-[#313c87] p-4 rounded-lg shadow-lg w-3/4 max-w-lg text-white border border-[#50acf7]">
                        <h2 className="text-xl font-semibold text-[#50acf7] mb-2">Public Keys</h2>
                        <div className="mb-3">
                            <div className="text-[#74f2cc] font-medium mb-1">Sender's Public Key:</div>
                            <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{transaction.sender_PublicKey}</pre>
                        </div>
                        <div className="mb-3">
                            <div className="text-[#74f2cc] font-medium mb-1">Recipient's Public Key:</div>
                            <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{transaction.recipient_PublicKey}</pre>
                        </div>
                        <button
                            className="bg-[#50acf7] text-white p-1 rounded shadow hover:bg-[#74f2cc] transition"
                            onClick={togglePublicKeyModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Signature Modal */}
            {isSignatureModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-[#313c87] p-4 rounded-lg shadow-lg w-3/4 max-w-md text-white border border-[#50acf7]">
                        <h2 className="text-xl font-semibold text-[#50acf7] mb-2">Transaction Signature</h2>
                        <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{transaction.signature}</pre>
                        <button
                            className="bg-[#50acf7] text-white p-1 rounded shadow hover:bg-[#74f2cc] transition mt-3"
                            onClick={toggleSignatureModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export { LinkArrow, ForwardArrow, TransactionBox };
