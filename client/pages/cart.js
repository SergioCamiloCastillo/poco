import { Grid } from "semantic-ui-react"
import { Button, Table, Input } from 'semantic-ui-react'
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
import { getDataProduct } from "api/product";
import useCart from "hooks/useCart";
import { BASE_PATH } from "utils/constants";
import Image from "next/image";
import { useEpayco } from 'react-epayco';
import AddressShipping from "@/components/Cart/AddressShipping/AddressShipping";

export default function cart() {
    const { getProductsCart, removeProductCart } = useCart();
    const products = getProductsCart();
    const [address, setAddress] = useState(null);
    const [productsData, setProductsData] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [reloadCart, setReloadCart] = useState(false);
    const [addressActive, setAddressActive] = useState(null);
    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
    }
    //configuracion epayco
    const { epayco } = useEpayco({
        key: 'a757f810f5446a875780436d72c3e53b7ab68dea',
    });

    const handlePay = useCallback(() => {
        var data = {
            name: "Your product name",
            description: 'Your product description',
            amount: 5000,
            external: "false"
        };

        epayco.open(data);
    }, [epayco]);
    useEffect(() => {
        let price = 0;
        (async () => {
            const productsTemp = [];
            if (products) {
                for await (const product of products) {
                    const data = await getDataProduct(product);
                    productsTemp.push(data);

                }
            }


            productsTemp?.map((item) => {
                price += item.precio;
            });
            setTotalPrice(price);
            setProductsData(productsTemp);

        })();
        setReloadCart(false);
    }, [reloadCart]);



    return !products ? <h1>No hay productos en el carrito</h1> :
        <div className='cart'>
            <h1>Carrito de compras</h1>
            <Grid>
                <Grid.Column mobile={16} tablet={10} computer={12}>
                    <Table basic='very' celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Imagen</Table.HeaderCell>
                                <Table.HeaderCell>Producto</Table.HeaderCell>
                                <Table.HeaderCell>Precio</Table.HeaderCell>
                                <Table.HeaderCell>Cantidad</Table.HeaderCell>
                                <Table.HeaderCell>Subtotal</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {productsData?.map((item) => (
                                <Table.Row>
                                    <Table.Cell textAlign='center'><FontAwesomeIcon onClick={() => removeProduct(item.url)} size="lg" icon={faTimesCircle} /></Table.Cell>
                                    <Table.Cell textAlign='center'><Image src={`${BASE_PATH}${item.imagen_principal.url}`} width={60} height={60} /></Table.Cell>
                                    <Table.Cell>{item.titulo}</Table.Cell>
                                    <Table.Cell>${item.precio}</Table.Cell>
                                    <Table.Cell textAlign='center'> <Input size='mini' type='number' /></Table.Cell>
                                    <Table.Cell>£18.30</Table.Cell>
                                </Table.Row>
                            ))}


                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={6} computer={4} textAlign='right'>
                    <h3>Total:{totalPrice.toFixed(2)}</h3>
                    <Button primary  onClick={handlePay}>Pagar</Button>

                </Grid.Column>
            </Grid>
            <AddressShipping address={address} addressActive={addressActive} setAddressActive={setAddressActive} setAddress={setAddress} />
        </div>
}

