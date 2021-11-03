import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import { getMeApi } from 'api/user';
import ChangeNameForm from '@/components/Account/ChangeNameForm';
import ChangePassword from '@/components/Account/ChangePassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'semantic-ui-react';
import BasicModal from '@/components/Modal/BasicModal/';
import AddressForm from '@/components/Account/AddressForm/AddressForm';
import ListAddress from '@/components/Account/ListAddress/ListAddress';


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
    if (!user) return null;//si no ha llegado los datos del backend, entonces asignele user un null, hasta que llegue la respuesta
    if (!auth && !user) { //si no esta logueado
        router.replace("/");
        return null;
    }

    return (
        <div className='account'>
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />
            <br /><br />
            <Addresses />
        </div>
    )
}

const Configuration = (props) => {
    const { user, logout, setReloadUser } = props;
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

const Addresses = () => {
    const [reloadAddresses, setReloadAddresses] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);

    const openModal = (title, address) => {
        setTitleModal(title);
        setShowModal(true);
        setFormModal(<AddressForm address={address || null} newAddress={address ? false : true} setReloadAddresses={setReloadAddresses} setShowModal={setShowModal} />);
        //en newadreess trae el objeto y verifica, si es true se insertara un nuevo valor, si es false ya trae datos por lo tanto la funcion es actualizar
    }

    return (
        <div className='account__addresses'>
            <div className='title'>Direcciones</div>
            <Button color='green' onClick={() => openModal("Nueva Dirección")}>Crear Dirección <FontAwesomeIcon icon={faPlus} /></Button>
            <div className='data'>
                <ListAddress openModal={openModal} setReloadAddresses={setReloadAddresses} reloadAddresses={reloadAddresses} />
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>{formModal}</BasicModal>
        </div>
    )
}
