import Navbar from "../components/navbar"
import { LoginContext } from "../components/auth/AuthContext"
import { useContext } from "react"
import { ModalContext } from "../components/ModalsContext"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import BlockchainView from "../components/BlockChainComp"
import Loading from "../components/Loading"
import { config } from "../config"

const BlockChain = () => {
    const { isLogin } = useContext(LoginContext);
    const { openModal } = useContext(ModalContext);
    const [blockchainData, setBlockchainData] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            openModal();
        }

    }, [isLogin, openModal]);

    useEffect(() => {
        fetch(`${config.API_URL}/api/view-blockchain/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => setBlockchainData(data));

    }, []);

    if (!isLogin) {
        return <Navigate to="/" />;
    }


    return (
        <>
            {blockchainData == null ? <Loading /> :

                <>
                    <Navbar />
                    <h1 className="text-center glow mt-6">Blockchain Explorer</h1>
                    <hr className="modern-hr" />

                    <div className="flex justify-center">
                        <span className="text-sm text-gray-300 text-center w-1/2">
                            Explore the latest blocks, transactions, and addresses on the blockchain. Dive into real-time data and discover the heartbeat of the decentralized network.
                        </span></div>

                    <div className="flex justify-center items-center my-2 ">
                        <div className="my-8 mx-4 sm:mx-16">
                            <div className="opacity-90 text-sm sm:text-lg text-center">Total Blocks</div>
                            <div className="transaction-no">{blockchainData.blocks_count}</div>
                        </div>
                        <div className="my-8 mx-4 sm:mx-16">
                            <div className="opacity-90 text-sm sm:text-lg text-center">Total Transactions</div>
                            <div className="transaction-no">{blockchainData.transactions_count}</div>
                        </div>
                        <div className="my-8 mx-4 sm:mx-16">
                            <div className="opacity-90 text-sm sm:text-lg text-center">Average Transactions Per Block</div>
                            <div className="transaction-no">{blockchainData.average_transaction}</div>
                        </div>
                    </div>
                    <hr className="modern-hr" />

                    <BlockchainView blockchainData={blockchainData.blocks} />
                </>
            }

        </>
    )
}
export default BlockChain