import { config } from '../../config';

const Register = async (name, username, email, password) => {


    try {
        const response = await fetch(`${config.API_URL}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, username: username, password: password })
        });
        //201 - created
        if (response.status === 201) {
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

export default Register;