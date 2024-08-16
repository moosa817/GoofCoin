import { config } from '../../config';
import TokenVerify from './TokenVerify';

const Authenticate = async (username, password) => {


    try {
        const response = await fetch(`${config.API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return false;
    }
};

const GuestAuth = async () => {
    try {
        const response = await fetch(`${config.API_URL}/api/guest_user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return false;
    }
};

export { Authenticate, GuestAuth };