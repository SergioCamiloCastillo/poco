import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react';
import Image from 'next/image';
import { BASE_PATH } from 'utils/constants';
import { faShoppingBasket, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addFavoriteApi, isFavoriteApi, deleteFavoriteApi } from 'api/favorite';
import useAuth from 'hooks/useAuth';
import { size } from "lodash-es";
import useCart from 'hooks/useCart';

export default function Product(props) {

    const { productData } = props;
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const [showImage, setShowImage] = useState(productData.imagen_principal.url);
    const changeImage = (urlImage) => { setShowImage(urlImage); }
    const { auth, logout } = useAuth();
    const { addProductCart } = useCart();
    const {  url } = productData;

    const addFavorite = async (idProduct) => {
        if (auth) {
            setIsFavorite(!isFavorite);
            await addFavoriteApi(auth.idUser, productData.id, logout);
            setReloadFavorite(true);


        }


    }
    const deleteFavorite = async (idProduct) => {
        if (auth) {
            setIsFavorite(!isFavorite);
            await deleteFavoriteApi(auth.idUser, productData.id, logout);
            setReloadFavorite(true);
        }


    }

    useEffect(() => {
        if (auth) {
            if (productData) {
                (async () => {

                    const response = await isFavoriteApi(auth.idUser, productData.id, logout);
                    setIsFavorite(size(response) > 0);
                })();
            }
            setReloadFavorite(false);
        }
    }, [productData, reloadFavorite]);


    return (
        <div className='product'>
            <Grid>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div className='image-principal'>
                        <div className='background-image'>


                            <Image src={`${BASE_PATH}${showImage}`} width={550} height={550} />

                        </div>
                    </div>
                    <div className='gallery'>

                        {
                            productData.galeria.map((image) => (

                                <Image className={showImage == image.url && "active"} onClick={() => changeImage(image.url)} src={`${BASE_PATH}${image.url}`} width='90' height='90' />

                            ))
                        }


                    </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div className='product-description'>
                        <h1>{productData.titulo}</h1>
                        <div className='description'>
                            <p>{productData.descripcion}
                            </p>
                        </div>
                        <div className='price'>
                            ${productData.precio}
                        </div>
                        <div className='cart'>

                            <div className='actions'>
                                <button className='minus'>-</button>
                                <input value='1' />
                                <button className='plus'>+</button>
                            </div>
                            <button onClick={()=>addProductCart(url)} className='btn-add-cart'><FontAwesomeIcon size="lg" icon={faShoppingBasket} />&nbsp;&nbsp;Add to Cart</button>
                            <FontAwesomeIcon onClick={isFavorite ? () => deleteFavorite(productData.id) : () => addFavorite(productData.id)} style={{ color: isFavorite ? "red" : "black" }} className='btn-add-favorites' icon={faHeart} />
                        </div>
                    </div>

                </Grid.Column>
            </Grid>

        </div>
    )
}
