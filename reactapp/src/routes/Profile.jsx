import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModalContext } from "../components/ModalsContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    let params = useParams();
    let UrlUsername = params.username;

    const { isLogin,Name,Username,Pfp} = useContext(LoginContext);
    const { openModal } = useContext(ModalContext);

    useEffect(() => {
        if (!isLogin) {
            openModal();
        }
    }, [isLogin, openModal]);

    if (!isLogin) {
        return <Navigate to="/" />;
    }

    let pfp = Pfp ? Pfp: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Name}&hair=short01&size=50`;
    return (
        <>
            <MyNav />
            <div className="container">
                <div className="flex justify-center">
                    <div>
                        <img src={pfp} alt="" />
                    </div>

                </div>

            </div>
        </>)
}
export default Profile;