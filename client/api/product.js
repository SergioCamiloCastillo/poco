const { BASE_PATH } = require("utils/constants");

export async function getLastProductsApi(limit) {

    try {
        const url = `${BASE_PATH}/productos?_limit=${limit}`;
        //es fetch porque es un api sin seguridad, sin token porque solo trae los productos
        const response = await fetch(url);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}