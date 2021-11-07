import ListProducts from "@/components/ListProducts/ListProducts";
import { getLastProductsApi } from "api/product";
import React from "react"
import { Loader } from "semantic-ui-react";


export default function Home({ productsData }) {


  return (
    <div className='home'>
      {!productsData && <Loader active>Cargando Juegos</Loader>}
      {productsData && productsData.length === 0 && <h1>Sin juegos</h1>}
      {productsData.length > 0 && <ListProducts productsData={productsData} />}
    </div>
  )
}

export async function getServerSideProps({ query }) {

  const productsData = await getLastProductsApi(4);

  return { props: { productsData } };
}