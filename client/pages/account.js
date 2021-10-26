import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import { getMeApi } from 'api/user';
import ChangeNameForm from '@/components/Account/ChangeNameForm/ChangeNameForm';

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            console.log("estamos en account", response);
            setUser(response || null); //si existe devuelve response, si no devuelve nada le asigno null
        })();
    }, [auth]);//cambiara el useffect cuando cambie de auth es decir otro usuario

    if (!auth && !user) { //si no esta logueado
        router.replace("/");
        return null;
    }

    return (
        <div className='account'>
            <Configuration user={user}/>
        </div>
    )
}

const Configuration = (props) => {
    const {user} = props;
    return (
        <div className='account__configuration'>
            <div className='title'>Tu Cuenta</div>
            <div className='data'>
                <ChangeNameForm user={user} />
            </div>

        </div>

    )
}
