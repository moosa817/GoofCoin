import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/ModalsContext";
import { useEffect } from "react";


const Transaction = () => {
    const { isLogin } = useContext(LoginContext);
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
            <h1>transaction</h1>
        </>)
}
export default Transaction;