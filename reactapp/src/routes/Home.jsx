import MyNav from "../components/navbar"
import Header from "../components/header"
import LoginModal from "../components/LoginModal"
import { useContext } from "react"
import { LoginContext } from "../components/AuthContext"
import { Navigate } from "react-router-dom"
//page when user not logged in
const Home = () => {
    const { isLogin } = useContext(LoginContext);

    if (isLogin) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <MyNav />
            <Header />
            <LoginModal />
        </>)
}
export default Home