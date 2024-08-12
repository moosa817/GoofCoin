
const Authenticate = async (username, password) => {


    try {
        const response = await fetch('http://localhost:8000/api/token/', {
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
        const response = await fetch('http://localhost:8000/api/guest_user/', {
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