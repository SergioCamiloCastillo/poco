import Product from '@/components/Product/';
import { getDataProduct } from 'api/product';
import { useRouter } from 'next/router'
import React from 'react'

export default function product({ productData }) {


    return (
        <div className='product'>
            <Product productData={productData} />
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const url = params?.product || null;
    const productData = await getDataProduct(url);
    if (productData) {
        return { props: { productData, url } };
    } else {
        res.statusCode = 302;
        res.setHeader("Location", `/`);
    }
}