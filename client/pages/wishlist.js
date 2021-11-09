import ListProducts from '@/components/ListProducts/ListProducts';
import { getFavoriteApi } from 'api/favorite'
import useAuth from 'hooks/useAuth'
import { size } from 'lodash-es';
import router from 'next/router';
import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react';

export default function wishlist() {
    const [products, setProducts] = useState(null);
    const { auth, logout } = useAuth();
    if (!auth) { //si no esta logueado
        router.replace("/");
        return null;
    }

    if (auth) {
        useEffect(() => {
            (async () => {
                const response = await getFavoriteApi(auth.idUser, logout);
                if (response.length > 0) {
                    const productsList = [];
                    response.map((data) => {
                        productsList.push(data.producto);
                    })
                    setProducts(productsList);
                } else {
                    setProducts([]);
                }
            })()
        }, [])
    }

    return (
        <div className='wishlist'>
            <div className='title'>Lista de favoritos</div>
            <div className='data'>
                {!products && <Loader active>Cargando Juegos</Loader>}
                {products && size(products) === 0 && <h1>No existen productos en esta lista</h1>}
                {products && <ListProducts productsData={products} />}
            </div>
        </div>
    )
}
