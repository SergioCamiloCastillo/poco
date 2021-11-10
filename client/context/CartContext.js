import { createContext } from "react";
//aqui solo se definen los metodos y variables que se usaran en el localstorage del carrito
const CartContext = createContext({

    productsCart: 0,
    addProductCart: () => null,
    getProductsCart: () => null,
    removeProductCart: () => null,
    removeAllProductsCart: () => null

});
export default CartContext;