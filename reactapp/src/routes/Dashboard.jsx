import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/ModalsContext";
import { useEffect } from "react";
import AccountInfo from '../components/dashboard/AccountInfo'
import RecentTransactionsComp from "../components/dashboard/RecentTransactionsComp";
import TransactionPanel from "../components/dashboard/TransactionPanel";

const Dashboard = () => {
    const { isLogin, Username, PublicKey, Balance, RecentTransactions } = useContext(LoginContext);
    const { openModal } = useContext(ModalContext);


    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin, openModal]);

    if (!isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <MyNav />
            <AccountInfo username={Username} balance={Balance} publicKey={PublicKey} />
            <div className="grid md:grid-cols-3 grid-cols-1  mx-16 gap-6">
                <div className="col-span-2">
                    <TransactionPanel />
                </div>
                <div className="col-span-1">
                    <RecentTransactionsComp username={Username} transactions={RecentTransactions} />
                </div>

            </div>
        </>
    );
}
export default Dashboard;