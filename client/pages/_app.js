import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import React, { useMemo, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken } from "../api/token";
import { useRouter } from "next/router";
import BasicLayout from "layouts/BasicLayout/";


function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log(token);
      setAuth({
        token: token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser])

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

  const cartData = useMemo(
    () => ({
      productsCart: 0,
      addProductCart: () => null,
      getProductsCart: () => null,
      removeProductCart: () => null,
      removeAllProductsCart: () => null
    }), []
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
