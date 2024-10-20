import MyNav from "../components/navbar"
import Header from "../components/header"
import LoginModal from "../components/auth/LoginModal"
import { useContext } from "react"
import { LoginContext } from "../components/auth/AuthContext"
import { Navigate } from "react-router-dom"

//page when user not logged in
const Setup = () => {
    const { isLogin, SetupCompleted } = useContext(LoginContext);

    if (!isLogin || SetupCompleted) {
        return <Navigate to="/" />
    }
    return (
        <>
            <MyNav />
            ok so complete your setup here
        </>)
}
export default Setup