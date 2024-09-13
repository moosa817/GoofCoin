import { config } from '../../config';

export const UpdateProfile = async (name,username,email,token) => {


    try {
        const response = await fetch(`${config.API_URL}/api/update_user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name:name, username: username,email:email })
        });

        if (response.status === 200) {
           
            return true
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return false;
    }
};