import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import { getMeApi } from 'api/user';
import ChangeNameForm from '@/components/Account/ChangeNameForm';
import ChangePassword from '@/components/Account/ChangePassword';

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null); //si existe devuelve response, si no devuelve nada le asigno null
        })();
    }, [auth]);//cambiara el useffect cuando cambie de auth es decir otro usuario
    if(!user) return null;//si no ha llegado los datos del backend, entonces asignele user un null, hasta que llegue la respuesta
    if (!auth && !user) { //si no esta logueado
        router.replace("/");
        return null;
    }

    return (
        <div className='account'>
            <Configuration user={user} logout={ logout} setReloadUser={setReloadUser} />
        </div>
    )
}

const Configuration = (props) => {
    const {user,logout,setReloadUser} = props;
    return (
        <div className='account__configuration'>
            <div className='title'>Tu Cuenta</div>
            <div className='data'>
                <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangePassword user={user} logout={logout} setReloadUser={setReloadUser} />
            </div>

        </div>

    )
}
