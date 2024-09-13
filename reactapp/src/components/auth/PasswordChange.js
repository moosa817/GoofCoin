import { config } from '../../config';

export const ChangePwd = async (OldPass, NewPass, ConfirmPass, token) => {


    try {
        const response = await fetch(`${config.API_URL}/api/password_change/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                old_password: OldPass,
                new_password: NewPass,
                confirm_password: ConfirmPass
            })
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