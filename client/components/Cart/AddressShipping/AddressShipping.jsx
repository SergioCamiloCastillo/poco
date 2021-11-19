import { useState, useEffect, useCallback } from "react"
import { Grid, Button, Card } from "semantic-ui-react"
import { map, size } from "lodash";
import Link from "next/link";
import { getAddressesApi } from "api/address";
import useAuth from "hooks/useAuth";
import classNames from "classnames";

export default function AddressShipping(props) {
    
    const { addressActive, setAddressActive, setAddress } = props;

    const [addresses, setAddresses] = useState(null);
    const { auth, logout } = useAuth();
    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
        })()
    }, []);
    const changeAddress = (id, addressData) => {
        setAddressActive(id);
        setAddress(addressData);
    }
    return (
        <div className='address-shipping'>
            <h1>Direccion de envio</h1>

            {
                size(addresses) === 0 ? (
                    <>
                        <h3>No hay ninguna direccion creada</h3>

                        <Link href='/account'>Añade una cuenta nueva</Link>
                    </>

                )
                    :
                    (

                        <Grid>
                            {addresses?.map((item) => (
                                <Grid.Column mobile={16} tablet={8} computer={4} key={item.id}>
                                    <Card onClick={() => changeAddress(item.id, item)} className={classNames("address", {
                                        active: addressActive === item.id
                                    })}>
                                        <strong >{item.title}</strong><br />
                                        <p></p>
                                        Address: {item.address}<br />
                                        City: {item.city}


                                    </Card>
                                </Grid.Column>
                            ))}
                        </Grid>
                    )
            }




        </div>
    )
}
