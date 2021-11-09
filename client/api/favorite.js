import { authFetch } from "utils/fetch";

import { BASE_PATH } from "utils/constants";
import { size } from "lodash-es";

export async function isFavoriteApi(idUser, idProduct, logout) {
    try {
        const url = `${BASE_PATH}/favoritos?usuario=${idUser}&producto=${idProduct}`;
        return await authFetch(url, null, logout);
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function addFavoriteApi(idUser, idProduct, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idProduct, logout);
        if (size(dataFound) > 0 || !dataFound) {
            return "Este juego ya esta en favoritos";
        } else {
            const url = `${BASE_PATH}/favoritos`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario: idUser, producto: idProduct })
            }
            const result = await authFetch(url, params, logout);

            return result;
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}
export async function deleteFavoriteApi(idUser, idProduct, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idProduct, logout);
        if (dataFound.length > 0 || !dataFound) {
            const url = `${BASE_PATH}/favoritos/${dataFound[0].id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },

            }
            const result = await authFetch(url, params, logout);
            return result;

        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
export async function getFavoriteApi(idUser, logout) {
    try {
        const url = `${BASE_PATH}/favoritos?usuario=${idUser}`;
        const result = await authFetch(url, null, logout);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}