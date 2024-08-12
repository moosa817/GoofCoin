import { LoginContext } from "../components/auth/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const { setisLogin, setUsername, setEmail, setName, setisGuest, setPublicKey, setPfp, setBalance } = useContext(LoginContext);

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        setisLogin(false);
        setUsername('');
        setEmail('');
        setName('');
        setisGuest(false);
        setPublicKey('');
        setPfp('');
        setBalance(0);
    }, [])


    return <Navigate to="/" />;
}

export default Logout;