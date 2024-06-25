import Navbar from "../components/navbar"
import { LoginContext } from "../components/AuthContext"
import { useContext } from "react"
import { ModalContext } from "../components/LoginPageContext"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const BlockChain = () => {
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
            <Navbar />
            Hey Blockchain

        </>
    )
}
export default BlockChain