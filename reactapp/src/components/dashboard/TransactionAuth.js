import { config } from '../../config';

export const MakeTransaction = async (amount, recipient, file) => {

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('recipient', recipient);
    formData.append('privateKeyFile ', file);

    try {
        const response = await fetch(
            `${config.API_URL}/api/make/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: { formData }
        }

        );
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}