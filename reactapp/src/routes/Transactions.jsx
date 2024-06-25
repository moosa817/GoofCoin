import MyNav from "../components/navbar";
import Header from "../components/header";
import { LoginContext } from "../components/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/LoginPageContext";
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