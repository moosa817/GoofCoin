import { LoginContext } from './AuthContext';
import { useEffect, useContext } from 'react';

const AccessToken = async (token) => {
    try {
        const response = await fetch('http://localhost:8000/api/verify-token/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            return response.json();
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during token verification:", error);
        return false;
    }
}

const RefreshToken = async (refresh) => {
    try {
        const response = await fetch('http://localhost:8000/api/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refresh })
        });

        if (response.status === 200) {
            return response.json();
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during token refresh:", error);
        return false;
    }
}


//component
// checks token , refresh's if needed saves username email etc
const TokenVerify = () => {
    const { isLogin, setisLogin, setisLoading, setName, setEmail, setUsername } = useContext(LoginContext);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            const refresh = localStorage.getItem('refresh');

            if (token) {
                try {
                    const result = await AccessToken(token);
                    console.log(result);
                    if (result.valid) {
                        setisLogin(true);
                        setisLoading(false);
                        setName(result.name);
                        setEmail(result.email);
                        setUsername(result.username);
                        return;
                    }
                } catch (error) {
                    console.error('Error verifying token, Trying refresh:', error);
                }
            }

            if (refresh) {
                try {
                    const result = await RefreshToken(refresh);
                    if (result.access) {
                        localStorage.setItem('token', result.access);

                        const result2 = await AccessToken(result.access)
                        if (result2.valid) {
                            setName(result2.name);
                            setEmail(result2.email);
                            setUsername(result2.username);
                            setisLogin(true);
                            setisLoading(false);
                        }
                        return;
                    }

                } catch (error) {
                    console.error('Refresh Token failed', error);
                }
            } else {
                setisLoading(false);

            }
        };

        checkToken();
    }, [isLogin]);


    return null;
}



export default TokenVerify;