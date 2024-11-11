
import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/ModalsContext";
import { useEffect } from "react";
import { GetTransactions } from "../components/transaction/TransactionsAuth";
import { TransactionBox } from '../components/transaction/TransactionsComp'
import Loading from "../components/Loading";
const Transaction = () => {
    const { isLogin, Username } = useContext(LoginContext);
    const { openModal } = useContext(ModalContext);
    const [Transactions, setTransactions] = useState({});

    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin, openModal]);
    if (!isLogin) {
        return <Navigate to="/" />;
    }



    useEffect(() => {
        (async (username) => { setTransactions(await GetTransactions(username)) })(Username);

    }, [Username])



    return (
        <>
            {Transactions.transactions != null ?
                <>


                    <MyNav />
                    <h1 className="text-center glow mt-6">My Transactions</h1>
                    <hr className="modern-hr" />

                    {/* balance */}
                    <div className="flex justify-center items-center my-2 ">
                        <div className="my-8 mx-4 sm:mx-16">
                            <div className="opacity-90">Your Balance</div>
                            <div className="transaction-no">{Transactions.received_amount - Transactions.sent_amount}</div>
                        </div>
                        <span className="mt-2 saturate-150 text-xl"> = </span>
                        <div className="my-8 mx-4 sm:mx-16">
                            <div className="opacity-90">Coins Recieved</div>
                            <div className="transaction-no">{Transactions.received_amount}</div>
                        </div>
                        <span className="mt-2 saturate-150 text-xl">-</span>
                        <div className="my-8 mx-4 sm:mx-16">
                            <div className="opacity-90">Coins Spent</div>
                            <div className="transaction-no">{Transactions.sent_amount}</div>
                        </div>
                    </div>
                    <hr className="modern-hr" />


                    <TransactionBox transactions={Transactions.transactions} />

                </> :
                <Loading />
            }
        </>)
}
export default Transaction;