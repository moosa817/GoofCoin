import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SingleTransaction } from '../transaction/TransactionsComp';

const RecentTransactions = ({ transactions, username }) => {
    // State to track the currently selected transaction
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal with the selected transaction
    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="recent-transactions-box bg-[#3b4691] text-white rounded-lg shadow-lg p-5 max-w-[400px] mx-auto">
            <h3 className="font-semibold text-xl border-b-2 border-[#50acf7] pb-3">Recent Transactions</h3>

            {transactions.map((transaction) => {
                const isReceived = transaction.recipient_username === username;

                return (
                    <div key={transaction.id}>
                        <div

                            className="transaction-item flex justify-between py-3 cursor-pointer" style={{ textDecoration: 'none' }}
                            onClick={() => openModal(transaction)}  // Open modal on click
                        >
                            <div className="">
                                <span className="font-bold">
                                    {isReceived ? 'Coins Received' : 'Coins Sent'}
                                </span><br />
                                <span className="text-sm text-[#c4c4c4]">
                                    {transaction.sender_username} → {transaction.recipient_username}
                                </span><br />
                                <span className="text-xs text-[#9b9b9b]">
                                    {new Date(transaction.timestamp).toLocaleString()}
                                </span>


                            </div>
                            <div className="flex justiyf-center items-center bg-[#50acf7] text-[#313c87] rounded-lg px-3 py-2 text-center h-12 my-auto">
                                <div>
                                    {isReceived ? `+${transaction.amount} Coins` : `-${transaction.amount} Coins`}
                                </div>

                            </div>

                        </div>
                        <hr className='modern-hr' />
                    </div>

                );
            })}
            <div className="text-center mt-4">
                <Link to="/transactions" className="text-[#50acf7] font-semibold hover:underline">
                    View All Transactions
                </Link>
            </div>

            {isModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-content bg-[#3b4691] text-white p-8 rounded-xl shadow-lg max-w-lg w-full relative">
                        <SingleTransaction transaction={selectedTransaction} isLast={true} />
                        <button
                            className="modal-close absolute top-5 right-5 text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-.5 text-2xl focus:outline-none"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RecentTransactions;
