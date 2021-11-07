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
export async function getProductsCategoryApi(category, limit, start) {
    try {
        const url = `${BASE_PATH}/productos?categoria.url=${category}&_limit=${limit}&_sort=created_at:desc&_start=${start}`;
        const response = await fetch(url);
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getTotalProductsCategoryApi(category) {
    try {
        const url = `${BASE_PATH}/productos/count?categoria.url=${category}`;
        const response = await fetch(url);
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getDataProduct(path) {
    try {
        const url = `${BASE_PATH}/productos?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}