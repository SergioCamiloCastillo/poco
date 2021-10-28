import { BASE_PATH } from "utils/constants";
import { authFetch } from "utils/fetch";

export async function createAddressAPi(addressData, logout) {
    try {
        const url = `${BASE_PATH}/direcciones`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addressData),
        }
        const result = await authFetch(url, params, logout);
       
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}