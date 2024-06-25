import MyNav from "../components/navbar";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../components/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/LoginPageContext";
import { useEffect } from "react";


const Dashboard = () => {
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
            <h1>Dashboard</h1>
        </>)
}
export default Dashboard;