import ListProducts from '@/components/ListProducts/ListProducts';
import { searchProductsApi } from 'api/product'
import { size } from 'lodash-es';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react';

export default function search() {
    const [products, setProducts] = useState(null);
    const { query } = useRouter();
    useEffect(() => {
        (async () => {
            if (size(query.query) > 0) {
                const result = await searchProductsApi(query.query);
                if (size(result) > 0) {
                    setProducts(result);
                } else {
                    setProducts([]);
                }
            } else {
                setProducts([]);
            }

        })()
    }, [query]);
    return (
        <div>
            {!products && <Loader active>Buscando productos...</Loader>}
            {products && size(products) === 0 && (
                <div><h3>No se han encontrado productos.</h3></div>
            )}
            {size(products) > 0 && <ListProducts productsData={products} />}
        </div>
    )
}
