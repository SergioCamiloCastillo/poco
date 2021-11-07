import ListProducts from '@/components/ListProducts/';
import Pagination from '@/components/Pagination/Pagination';
import { getProductsCategoryApi, getTotalProductsCategoryApi } from 'api/product';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Loader } from 'semantic-ui-react';
import { calculateNumItemsPerPage } from 'utils/helpers';
import { LIMIT_PER_PAGE } from "../../utils/constants";

export default function Category({ products, totalProductsCategory }) {

    const { query } = useRouter();
    


    //query trae los datos de la url actual
    return (
        <>

            {!products && <Loader active>Cargando Juegos</Loader>}
            {products && products.length === 0 && <h1>No existen productos para esta categoria.</h1>}
            {products.length > 0 && <ListProducts productsData={products} />}
            {totalProductsCategory > 0 ? <Pagination limitPerPage={LIMIT_PER_PAGE} totalProductsCategory={totalProductsCategory} page={query.page ? parseInt(query.page) : 1} /> : null}
            
        </>

    )
}


export async function getServerSideProps({ query }) {
   
    const platform = query?.id;
    const currentPage = query?.page || 1;
    const start = calculateNumItemsPerPage(currentPage, LIMIT_PER_PAGE); 
   
     

    const products = await getProductsCategoryApi(platform, LIMIT_PER_PAGE, start);
    const totalProductsCategory = await getTotalProductsCategoryApi(query?.id);

    return { props: { products, totalProductsCategory } };
}