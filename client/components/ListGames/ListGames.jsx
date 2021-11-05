import React from 'react'
import { Grid } from 'semantic-ui-react';
import Image from "next/image";
import { BASE_PATH } from 'utils/constants';
export default function ListGames(props) {
    const { productsData } = props;
    console.log(productsData);
    console.log("aqui van productos: ", productsData);
    return (
        <div className='list-games'>
            <Grid>
                {
                    productsData.map((item) => (
                        
                        <Grid.Column key={item.id} mobile={16} tablet={8} computer={4}>
                            <div className='product-block'>
                                <div className='product-image'>
                                   

                                    <Image src={`${BASE_PATH}${item.imagen_principal.url}`} alt={item.title} width={200} height={200} />
                                </div>
                                <div className='product-description'>

                                </div>
                            </div>
                        </Grid.Column>
                    ))
                }

            </Grid>

        </div>
    )
}
