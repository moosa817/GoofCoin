import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/auth/LoginPageContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    let params = useParams();
    let UrlUsername = params.username;

    const { isLogin, Username, Email, Name } = useContext(LoginContext);
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
            <h1>Profile</h1>
            {Name}

            {UrlUsername === Username ? <h1>My Profile</h1> : <h1>Other Profile</h1>}
        </>)
}
export default Profile;