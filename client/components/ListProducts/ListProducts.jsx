import React from 'react'
import { Grid } from 'semantic-ui-react';
import Image from "next/image";
import { BASE_PATH } from 'utils/constants';
import { faHeart, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useCart from 'hooks/useCart';

export default function ListProducts(props) {
    const { productsData } = props;
    const { addProductCart } = useCart();
    return (
        <div className='list-games'>
            <Grid>
                {
                    productsData.map((item) => (

                        <Grid.Column key={item.id} mobile={16} tablet={8} computer={4}>
                            <Link href={`/${item.url}`}>
                                <div className='product-block'>
                                    <div className='product-transition'>
                                        <div className='btn-heart'>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </div>

                                        <div className='product-image'>


                                            <Image src={`${BASE_PATH}${item.imagen_principal.url}`} alt={item.title} width={280} height={280} />
                                        </div>
                                        <a></a>
                                    </div>

                                    <div className='product-caption'>
                                        <a className='product-title'>{item.titulo}</a>
                                        <div className='short-description'><p>{item.descripcion}</p></div>
                                        <Grid>


                                            <Grid.Column mobile={16} tablet={12} computer={8}>
                                                <div className='price'>
                                                    ${item.precio}
                                                </div>

                                            </Grid.Column>
                                            <Grid.Column mobile={16} tablet={12} computer={8}>
                                                <div className='btn-cart'>
                                                    <FontAwesomeIcon onClick={()=>addProductCart(item.id)} size="1x" icon={faCartPlus} />
                                                </div>
                                            </Grid.Column>
                                        </Grid>
                                    </div>
                                </div>
                            </Link>
                        </Grid.Column>
                    ))
                }

            </Grid>

        </div>
    )
}
