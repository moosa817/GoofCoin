import { config } from '../../config';

const GoogleAuthenticate = async (google_id, name, email, pfp_url) => {

    try {
        const response = await fetch(`${config.API_URL}/api/google_login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ google_id: google_id, name: name, email: email, pfp_url: pfp_url })
        });
        //201 - created
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
}
export { GoogleAuthenticate };