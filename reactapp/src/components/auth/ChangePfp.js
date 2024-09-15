import {config} from '../../config';

export const handleUpload = async (file) => {

    const formData = new FormData();
    formData.append('pfp', file);

    try {
        const response = await fetch(`${config.API_URL}/api/upload_pfp/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            return true;
        } else {
            console.error('Error uploading file:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
