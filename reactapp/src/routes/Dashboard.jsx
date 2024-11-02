import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { ModalContext } from "../components/ModalsContext";
import { useEffect } from "react";

const Dashboard = () => {
    const { isLogin, Username, Email, Name, SetupCompleted } = useContext(LoginContext);
    const { openModal } = useContext(ModalContext);


    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin, openModal]);

    if (!isLogin) {
        return <Navigate to="/" />;
    }

    console.log(SetupCompleted);
    return (
        <>
            <MyNav />
            <div className="fadeIn">
                wow my nanme is {Name} its dashboarding time<br></br>
            </div>
        </>)
}
export default Dashboard;