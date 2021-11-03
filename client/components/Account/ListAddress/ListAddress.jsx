import { getAddressesApi, removeAddressApi } from 'api/address';
import React, { useState, useEffect } from 'react'
import useAuth from 'hooks/useAuth';
import { map, size } from "lodash";
import { Grid, Button, Loader } from 'semantic-ui-react';

export default function ListAddress(props) {
    const { reloadAddresses, setReloadAddresses, openModal } = props;
    const [addresses, setAddresses] = useState(null);
    const { auth, logout } = useAuth();


    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
            setReloadAddresses(false);
            // si no esta vacio el response se le asigna setaddresses response sino se le asigna un array vacio
        })()
    }, [reloadAddresses]);
    if (!addresses) {
        return (<Loader />);
    }

    return (
        <div className='list-address'>

            {size(addresses) == 0 ? <h3>No hay ninguna dirección creada</h3> : <Grid>{map(addresses, (address) => (
                <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}><Address openModal={openModal} setReloadAddresses={setReloadAddresses} logout={logout} address={address} /></Grid.Column>
            ))}</Grid>}
        </div>
    )
}
const Address = (props) => {
    const { address, logout, setReloadAddresses, openModal } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const removeAddress = async (idAddress) => {
        setLoadingDelete(true);
        const response = await removeAddressApi(idAddress, logout);
        if (response) setReloadAddresses(true);
        setLoadingDelete(false);
    }
    return (
        <div className='address'>
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.state},{address.city},{address.postal}</p>
            <p>{address.phone}</p>
            <div className='actions'>
                <Button primary onClick={() => openModal(`Editar ${address.title}`, address)}>Editar</Button>
                <Button onClick={() => removeAddress(address.id)} loading={loadingDelete}>Eliminar</Button>
            </div>
        </div>
    )
}