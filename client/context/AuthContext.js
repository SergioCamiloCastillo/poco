import { createContext } from "react";
const login = () => {
    return null;
}
const logout = () => {
    return null;
}
const setReloadUser = () => {
    return null;
}
const AuthContext = createContext({

    auth: undefined,
    login: login(),
    logout: logout(),
    setReloadUser: setReloadUser() 
});

/* 
auth es para traer los datos del usuario logueado
login es la funcion para hacer login
logout para salirse del sistema
setreloaduser para recargar la pagina llamando la funcion desde cualquier parte de la aplicacion

*/
export default AuthContext;