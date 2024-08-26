import { config } from '../../config';

export const ConvertGuest = async (id, name, username, email, password) => {


    try {
        const response = await fetch(`${config.API_URL}/api/convert_guest/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "id": id,
                "name": name,
                "username": username,
                "email": email,
                "password": password
            })
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);
            return true;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return false;
    }
};