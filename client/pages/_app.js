import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import React, { useMemo, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken } from "../api/token";
import { useRouter } from "next/router";
import BasicLayout from "layouts/BasicLayout/";
import { getProductsCart, addProductCart, countProductsCart, removeProductCart } from "api/cart";


function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [realoadCart, setRealoadCart] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token: token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart);
    setRealoadCart(false);
  }, [realoadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token: token,
      idUser: jwtDecode(token).id
    })
  }
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  }
  const authData = useMemo(() => ({
    auth: auth,
    login: login,
    logout: logout,
    setReloadUser: setReloadUser
  }), [auth]);


  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setRealoadCart(true);
    } else {
      toast.warning("Para comprar un producto debe iniciar sesión");
    }
  }
  const removeProduct = (product) => {
    removeProductCart(product);
    setRealoadCart(true);
  }
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: () => null
    }), [totalProductsCart]
  );
  if (auth === undefined) {
    return null;
  }
  return (
    <>
      <AuthContext.Provider value={authData}>
        <CartContext.Provider value={cartData}>
          <BasicLayout>
            <Component {...pageProps} />
          </BasicLayout>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default MyApp;
