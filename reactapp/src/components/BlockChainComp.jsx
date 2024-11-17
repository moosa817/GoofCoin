/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';



const ForwardArrow = () => (
    <svg
        style={{
            width: '50px',
            height: '50px',
            position: 'relative',
            zIndex: '60',
            right: '-104%',
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

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"
        style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            zIndex: '10',
            right: '-13%',
            bottom: '-13%',
            fill: '#74f2cc'
        }}
        className="absolute sm:hidden">
        <defs>
            <bx:export>
                <bx:file format="svg" href="#SVGRepo_iconCarrier" />
            </bx:export>
        </defs>
        <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="matrix(1, 0, 0, 1, 46.334236, 9.817387)" />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" transform="matrix(1, 0, 0, 1, 46.334236, 9.817387)" />
        <g id="SVGRepo_iconCarrier" transform="matrix(0.769585, 0, 0, 0.764286, 51.42041, 1.39042)">
            <polygon points="79.746,65.36 123.894,21.213 102.681,0 22.074,80.606 102.681,161.213 123.894,140 79.254,95.36 325.295,95.36 325.295,377.369 355.295,377.369 355.295,65.36 " />
        </g>
        <rect x="302.434" y="283.708" width="21.536" height="106.742" style={{ stroke: ' rgb(0, 0, 0) ' }} />
        <rect x="237.828" y="367.978" width="86.142" height="23.408" style={{ stroke: 'rgb(0, 0, 0)' }} />
    </svg>
);


const BlockchainView = ({ blockchainData }) => {
    // Reverse the blockchain data
    const reversedBlocks = [...blockchainData].reverse();
    return (
        <div className="bg-[#313c87] p-8 min-h-screen text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reversedBlocks.map((block, index) => (
                    <BlockCard
                        key={block.id} // Changed from block.blockNumber to block.id
                        isLast={index === reversedBlocks.length - 1}
                        block={block}
                        previousHash={index === reversedBlocks.length - 1 ? 'Genesis Block' : reversedBlocks[index + 1].hash}
                    />
                ))}
            </div>
        </div>
    );
};

const BlockCard = ({ block, previousHash, isLast }) => {
    const [isHashModalOpen, setIsHashModalOpen] = useState(false);
    const [isPreviousHashModalOpen, setIsPreviousHashModalOpen] = useState(false);

    const toggleHashModal = () => setIsHashModalOpen(!isHashModalOpen);
    const togglePreviousHashModal = () => setIsPreviousHashModalOpen(!isPreviousHashModalOpen);

    return (
        <div className="bg-[#2a316d] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-300">
            <h3 className="text-2xl font-bold mb-4">
                Block ID #{block.id} {/* Changed from Block # to Block ID */}
            </h3>
            <p className="text-gray-400 text-sm mb-2">
                <strong>Block Created On:</strong> {new Date(block.timestamp).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })} {/* Updated timestamp format */}
            </p>
            <p className="text-gray-400 text-sm mb-2 font-bold">
                <strong >Nonce:</strong> {block.nonce} {/* Display nonce with prominence */}
            </p>
            <p
                className="text-gray-400 text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"

                onClick={togglePreviousHashModal}
            >
                <strong>Previous Hash:</strong> <span className='text-blue-400'>{previousHash != 'Genesis Block' ? previousHash.slice(0, 10) + '...' + previousHash.slice(-10) : 'Genesis Block'} </span>
            </p>

            {/* Previous Hash Modal */}
            {isPreviousHashModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-[#313c87] p-4 rounded-lg shadow-lg w-3/4 max-w-md text-white border border-[#50acf7]">
                        <h2 className="text-xl font-semibold text-[#50acf7] mb-2">Previous Block Hash</h2>
                        <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{previousHash}</pre>
                        <button
                            className="bg-[#50acf7] text-white p-1 rounded shadow hover:bg-[#74f2cc] transition mt-3"
                            onClick={togglePreviousHashModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <p
                className="text-gray-400 text-sm mb-4 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                onClick={toggleHashModal}
            >
                <strong>Hash:</strong> <span className='text-blue-400'>{block.hash.slice(0, 10) + '...' + block.hash.slice(-10)} </span>{/* Shortened hash for display */}
            </p>

            {/* Hash Modal */}
            {isHashModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                    <div className="bg-[#313c87] p-4 rounded-lg shadow-lg w-3/4 max-w-md text-white border border-[#50acf7]">
                        <h2 className="text-xl font-semibold text-[#50acf7] mb-2">Block Hash</h2>
                        <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{block.hash}</pre>
                        <button
                            className="bg-[#50acf7] text-white p-1 rounded shadow hover:bg-[#74f2cc] transition mt-3"
                            onClick={toggleHashModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <h4 className="text-xl font-semibold mb-3">Transactions:</h4>
            <TransactionBox transactions={block.transactions} />

            {!isLast && <LinkArrow />}
            {!isLast && <ForwardArrow />}

        </div>
    );
};

const TransactionBox = ({ transactions }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {transactions.map((transaction) => (
                <SingleTransaction key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
};

const SingleTransaction = ({ transaction }) => {
    const [isPublicKeyModalOpen, setIsPublicKeyModalOpen] = useState(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

    const togglePublicKeyModal = () => setIsPublicKeyModalOpen(!isPublicKeyModalOpen);
    const toggleSignatureModal = () => setIsSignatureModalOpen(!isSignatureModalOpen);

    const formattedTime = new Date(transaction.timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="transaction-box p-2 bg-[#3b4691] text-white rounded-lg shadow-lg relative">
            <span className="text-sm font-semibold text-[#50acf7]">Transaction Details</span>
            <div className=" mb-1 text-[10px]">
                <span className="font-medium text-[#74f2cc] text-[10px]">Sender:</span> {transaction.sender_username}
            </div>
            <div className=" text-xs">
                <span className="font-medium text-[#74f2cc] text-xs">Receiver:</span> <span className="text-[9px] mx-1">{transaction.recipient_username}</span>
            </div>
            <div className="">
                <span className="font-medium text-[#50acf7] text-[10px]">Amount:</span> <span className="font-bold text-[#74f2cc] text-[10px]">{transaction.amount} Coins</span>
            </div>
            <div className=" text-xs text-gray-400">
                <span className="font-medium text-[10px]">Time: </span>
                <span className="mx-1 text-[10px]">{formattedTime}</span>
            </div>
            <div className="">
                <span className="font-medium text-[#74f2cc] text-xs">Signature:</span>{' '}
                <button onClick={toggleSignatureModal} className="text-[#50acf7] underline hover:text-[#74f2cc] text-[9px] mx-1">
                    View Signature
                </button>
            </div>
            <button
                className="mt-2 bg-[#144185] text-white p-1 px-3 rounded shadow hover:bg-[#50acf7] text-sm transition"
                onClick={togglePublicKeyModal}
            >
                Show Public Keys
            </button>

            {/* Public Keys Modal */}
            {isPublicKeyModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 overflow-y-visible">
                    <div className="bg-[#313c87] p-4 rounded-lg shadow-lg w-3/4 max-w-lg text-white border border-[#50acf7]">
                        <h2 className="text-xl font-semibold text-[#50acf7] mb-2">Public Keys</h2>
                        <div className="mb-3">
                            <div className="text-[#74f2cc] font-medium mb-1">Sender&apos;s Public Key:</div>
                            <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{transaction.sender_PublicKey}</pre>
                        </div>
                        <div className="mb-3">
                            <div className="text-[#74f2cc] font-medium mb-1">Recipient&apos;s Public Key:</div>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 overflow-y-visible">
                    <div className="bg-[#313c87] p-4 rounded-lg shadow-lg w-3/4 max-w-lg text-white border border-[#50acf7]">
                        <h2 className="text-xl font-semibold text-[#50acf7] mb-2">Signature</h2>
                        <pre className="bg-[#144185] p-2 rounded overflow-x-auto text-xs">{transaction.signature}</pre>
                        <button
                            className="bg-[#50acf7] text-white p-1 rounded shadow hover:bg-[#74f2cc] transition"
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

export default BlockchainView;
