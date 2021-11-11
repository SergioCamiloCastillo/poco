import { size } from "lodash-es";
import { toast, includes, remove } from "react-toastify";

const { BASE_PATH, CART } = require("utils/constants");

export function getProductsCart() {
    const cart = localStorage(CART);
    if (!cart) {
        return null;
    } else {
        const products = cart.split(",");
        //como los productos van a ser string separados por una coma, entonces con split se dividiran por coma
        return products;
    }
}
export function addProductCart(product) {
    const cart = getProductsCart();
    if (!cart) {
        localStorage.setItem(CART, product);
        toast.success("Añadido correctamente");
    } else {
        const productFound = includes(cart, product);
        if (productFound) {
            toast.warning('Este producto esta en el carrito');

        } else {
            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success("Producto añadido correctamente");
        }
    }
}