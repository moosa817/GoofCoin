import MyNav from "../components/navbar"
import Header from "../components/header"
import LoginModal from "../components/auth/LoginModal"
import { useContext } from "react"
import { LoginContext } from "../components/auth/AuthContext"
import { Navigate } from "react-router-dom"

import GoogleSignIn from '../components/auth/GoogleSign';
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
            <GoogleSignIn showButton={false} />
        </>)
}
export default Home