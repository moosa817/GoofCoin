import Navbar from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../components/ModalsContext";
import { Navigate } from "react-router-dom";
import BlockchainView from "../components/BlockChainComp";
import Loading from "../components/Loading";
import { config } from "../config";

const BlockChain = () => {
    const { isLogin } = useContext(LoginContext);
    const { openModal } = useContext(ModalContext);
    const [LoadingBlocks, setLoadingBlocks] = useState(false);
    const [blockchainData, setBlockchainData] = useState({
        blocks: [],
        blocks_count: null,
        transactions_count: null,
        average_transaction: null,
    });
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin, openModal]);

    const fetchBlockchainData = (url) => {
        setLoadingBlocks(true);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoadingBlocks(false);

                console.log(data);

                // Filter out duplicate blocks
                setBlockchainData((prev) => {
                    const existingBlockIds = new Set(prev.blocks.map((block) => block.id)); // Assuming 'id' is the unique identifier

                    const uniqueBlocks = data.results.blocks.filter((block) => !existingBlockIds.has(block.id)).reverse();
                    console.log(prev.blocks)
                    return {
                        blocks: [...uniqueBlocks, ...prev.blocks],
                        blocks_count: data.results.blocks_count ?? prev.blocks_count,
                        transactions_count: data.results.transactions_count ?? prev.transactions_count,
                        average_transaction: data.results.average_transaction ?? prev.average_transaction,
                    };
                });

                setNextPage(data.next);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching blockchain data:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBlockchainData(`${config.API_URL}/api/view-blockchain/all`);
    }, []);

    const loadMoreBlocks = () => {
        if (nextPage) {
            fetchBlockchainData(nextPage);
        }
    };

    if (!isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            {loading && blockchainData.blocks.length === 0 ? (
                <Loading />
            ) : (
                <>
                    <Navbar />
                    <h1 className="text-center glow mt-6">Blockchain Explorer</h1>
                    <hr className="modern-hr" />

                    {blockchainData.blocks_count !== null && (
                        <div className="flex justify-center items-center my-2">
                            <div className="my-8 mx-4 sm:mx-16">
                                <div className="opacity-90 text-sm sm:text-lg text-center">Total Blocks</div>
                                <div className="transaction-no">{blockchainData.blocks_count}</div>
                            </div>
                            <div className="my-8 mx-4 sm:mx-16">
                                <div className="opacity-90 text-sm sm:text-lg text-center">Total Transactions</div>
                                <div className="transaction-no">{blockchainData.transactions_count}</div>
                            </div>
                            <div className="my-8 mx-4 sm:mx-16">
                                <div className="opacity-90 text-sm sm:text-lg text-center">
                                    Average Transactions Per Block
                                </div>
                                <div className="transaction-no">{blockchainData.average_transaction}</div>
                            </div>
                        </div>
                    )}
                    <hr className="modern-hr" />

                    <BlockchainView blockchainData={blockchainData.blocks} />

                    {nextPage && (
                        <div className="flex justify-center my-4">

                            {LoadingBlocks ?
                                <div role="status" className="flex justify-center">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                <button
                                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                                    onClick={loadMoreBlocks}
                                >

                                    Load More Blocks
                                </button>

                            }
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default BlockChain;
