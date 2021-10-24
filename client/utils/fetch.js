import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
    //url es el enlace al que vamos a acceder
    //params parametros de busqueda de datos segun las condicionales
    //logout es la funcion de logout por si el token ha caducado
    const token = getToken();
    if (!token) {
        //usuario no logueado
        logout();
    } else {
        //token existe es decir que esta logueado
        if (hasExpiredToken(token)) {
            //token caducado
            logout();
        } else {
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await fetch(url, paramsTemp);
                const result = await response.json();
                return result;  
            } catch (error) {
                return error;
            }
        }
    }
}