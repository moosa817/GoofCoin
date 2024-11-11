import { config } from '../../config';


export const GetTransactions = async (username) => {

    try {
        const result = await fetch(`${config.API_URL}/api/get_transactions/${username}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        if (result.status === 200) {
            const data = await result.json();
            return data;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Error during getting transactions:", error);
        return false;
    }



}
