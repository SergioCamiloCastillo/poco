
import { Grid } from 'semantic-ui-react'
import { Image as ImageSemantic } from 'semantic-ui-react';
import { faPowerOff, faMotorcycle, faSearch, faUser, faHeart, faShoppingBasket, faChevronDown, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal, Input } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import BasicModal from '../Modal/BasicModal/';
import Auth from '../Auth/';
import useAuth from 'hooks/useAuth';
import { getMeApi } from 'api/user';
import Link from 'next/link'
import { getCategoryApi } from 'api/category';
import { map } from 'lodash';
import { useRouter } from 'next/router';


export default function Header() {
    const router = useRouter();
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Iniciar Sesión");
    const [user, setUser] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const changeShowModal = () => setShowModal(!showModal);
    const onCloseModal = () => setShowModal(false);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const { logout, auth } = useAuth();
    console.log(search);
    useEffect(() => {
        if (load) {
            router.push(`/search?query=${search}`);
        }
        setLoad(true);
    }, [search]);

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })()
        //esta funcion anomima para que se llame asimisma
    }, [auth]);
    useEffect(() => {
        (async () => {
            const response = await getCategoryApi();
            setCategories(response || []);
        })()
    }, [])
    return (
        <div className='header'>
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={9}>

                    <nav id="menu">
                        <ImageSemantic src='/logo.svg' size='small' />

                        <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <Link href="/"><a href="/">Home</a></Link>
                            </div>

                        </div>
                        <div className="menu-item">

                            <div className="menu-text">
                                <Link href="/products"><a href="#">Menú <FontAwesomeIcon icon={faChevronDown} /></a></Link>
                            </div>
                            <div className="sub-menu">
                                {map(categories, (category) => (
                                    <Link href={`/category/${category.url}`}>

                                        <div className="icon-box">
                                            <div className="icon"></div>
                                            <div className="text">
                                                <div className="title">{category.titulo} <i className="far fa-arrow-right"></i></div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                <div className="sub-menu-holder"></div>
                            </div>
                        </div>

                        <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <Link href="/about"><a href="/">Nosotros</a></Link>
                            </div>

                        </div>
                        {/*  {
                            user.tipo_usuario == 3 && 
                        } * */}
                        {user?.tipo_usuario === 3 && <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <Link href="/orders"><a href="/">Pedidos</a></Link>
                            </div>

                        </div>}

                        <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <Link href="/contact"><a href="/">Contácto</a></Link>
                            </div>

                        </div>
                    </nav>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={7}>
                    <div className='other-services'>
                        <div className='other-services__call-order'>
                            <div className='logo'><FontAwesomeIcon size="3x" icon={faMotorcycle} /></div>
                            <div>
                                <p className='title-call-order'>Llámanos y ordena</p>
                                <p className='number'>+601 5410113</p>
                            </div>

                        </div>
                        <div className='other-services__shop'>
                            <Form>
                                <BasicModal title={titleModal} show={showModal} setShow={setShowModal} size="small"><Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} /></BasicModal>

                                <Modal

                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    open={open}
                                    trigger={<a><FontAwesomeIcon size="lg" icon={faSearch} /></a>}
                                >

                                    <Modal.Content image>
                                        <Modal.Description>
                                            <Form.Field
                                                width={12}
                                                id='search-product'
                                                control={Input}
                                                label='Buscar producto: '
                                                placeholder='Buscar...'
                                                value={router.query.query}
                                                onChange={(_, data) => setSearch(data.value)}
                                            />
                                        </Modal.Description>
                                        <Modal.Actions>

                                            <Button onClick={() => setOpen(false)} positive>
                                                Buscar
                                            </Button>
                                        </Modal.Actions>
                                    </Modal.Content>

                                </Modal>
                            </Form>


                            {user && <Link href='account'><a><FontAwesomeIcon size="lg" icon={faUser} /></a></Link>}


                            <Link href="/wishlist"><a><FontAwesomeIcon size="lg" icon={faHeart} /></a></Link>
                            <Link href="/cart"><a><FontAwesomeIcon size="lg" icon={faShoppingBasket} /></a></Link>
                            {user ? <a onClick={logout}><FontAwesomeIcon size="lg" icon={faPowerOff} /></a> : <a onClick={changeShowModal}><FontAwesomeIcon size="lg" icon={faSignInAlt} /></a>}

                        </div>

                    </div>
                </Grid.Column>
            </Grid>




        </div>
    )
}
