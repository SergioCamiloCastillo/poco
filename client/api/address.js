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

export async function getAddressesApi(idUser, logout) {
    try {
        const url = `${BASE_PATH}/direcciones?usuario=${idUser}`;
        const result = await authFetch(url, null, logout);
        //como esto es un get no necesita body para pasar los datos a la api 
        if (result.statusCode === 500) throw "Error del servidor"
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function removeAddressApi(idAddress, logout) {

    try {
        const url = `${BASE_PATH}/direcciones/${idAddress}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const result = await authFetch(url, params, logout);
        if (result.statusCode === 500) throw "Error del servidor";
        return true;

    } catch (error) {
        console.log(error);
        return null;
    }
}