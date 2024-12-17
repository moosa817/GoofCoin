import { config } from '../../config';

export const MakeTransaction = async (amount, recipient, file) => {

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('recipient', recipient);
    formData.append('privateKeyFile ', file);

    try {
        const response = await fetch(
            `${config.API_URL}/api/make-transaction/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        }
        );
        return await response.json();

    } catch (error) {
        console.error(error);
        return { "error": true, "message": "Something Went Wrong Please Try Again" };
    }

}