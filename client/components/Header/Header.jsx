
import { Grid } from 'semantic-ui-react'
import { Image as ImageSemantic } from 'semantic-ui-react';
import { faHamburger, faPizzaSlice, faHotdog, faDrumstickBite, faMotorcycle, faSearch, faUser, faHeart, faShoppingBasket, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal, Input } from 'semantic-ui-react'
import { useState } from 'react';
import BasicModal from '../Modal/BasicModal/';
import Auth from '../Auth/';
export default function Header() {
    const [open, setOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Iniciar Sesión");
    const [showModal, setShowModal] = useState(false);
    const changeShowModal = () => setShowModal(!showModal);
    const onCloseModal = () => setShowModal(false);
    return (
        <div className='header'>
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={9}>

                    <nav id="menu">
                        <ImageSemantic src='/logo.svg' size='small' />

                        <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <a href="/">Home</a>
                            </div>

                        </div>
                        <div className="menu-item">

                            <div className="menu-text">
                                <a href="#">Menú <FontAwesomeIcon icon={faChevronDown} /></a>
                            </div>
                            <div className="sub-menu">
                                <div className="icon-box">
                                    <div className="icon"><FontAwesomeIcon icon={faHamburger} /></div>

                                    <span className="title">Hamburguesa <i className="far fa-arrow-right"></i></span>

                                </div>
                                <div className="icon-box">
                                    <div className="icon"><FontAwesomeIcon icon={faPizzaSlice} /></div>
                                    <div className="text">
                                        <div className="title">Pizza <i className="far fa-arrow-right"></i></div>
                                    </div>
                                </div>
                                <div className="icon-box">
                                    <div className="icon"><FontAwesomeIcon icon={faHotdog} /></div>
                                    <div className="text">
                                        <div className="title">Perro Caliente <i className="far fa-arrow-right"></i></div>
                                    </div>
                                </div>
                                <div className="icon-box">
                                    <div className="icon"><FontAwesomeIcon icon={faDrumstickBite} /></div>
                                    <div className="text">
                                        <div className="title">Pollo <i className="far fa-arrow-right"></i></div>
                                    </div>
                                </div>
                                <div className="sub-menu-holder"></div>
                            </div>
                        </div>

                        <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <a href="/">Nosotros</a>
                            </div>

                        </div>
                        <div className="menu-item-without-submenu">

                            <div className="menu-text">
                                <a href="/">Contácto</a>
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
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='Buscar producto: '
                                                placeholder='Buscar...'
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

                            <a onClick={changeShowModal}><FontAwesomeIcon size="lg" icon={faUser} /></a>
                            <a><FontAwesomeIcon size="lg" icon={faHeart} /></a>
                            <a><FontAwesomeIcon size="lg" icon={faShoppingBasket} /></a>
                        </div>

                    </div>
                </Grid.Column>
            </Grid>




        </div>
    )
}
