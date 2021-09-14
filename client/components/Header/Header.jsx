
import { Grid } from 'semantic-ui-react'
import { Image as ImageSemantic } from 'semantic-ui-react';
import { faHamburger, faPizzaSlice, faHotdog, faDrumstickBite, faBicycle, faSearch,faUser,faHeart,faShoppingBasket, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
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
                    <div class='other-services'>
                        <div className='other-services__call-order'>
                            <div className='logo'><FontAwesomeIcon size="3x" icon={faBicycle} /></div>
                            <div>
                                <p class='title-call-order'>Llámanos y ordena</p>
                                <p class='number'>+601 5410113</p>
                            </div>

                        </div>
                        <div className='other-services__shop'>
                            <a><FontAwesomeIcon size="lg" icon={faSearch} /></a>
                            <a><FontAwesomeIcon size="lg" icon={faUser} /></a>
                            <a><FontAwesomeIcon size="lg" icon={faHeart} /></a>
                            <a><FontAwesomeIcon size="lg" icon={faShoppingBasket} /></a>
                        </div>

                    </div>
                </Grid.Column>
            </Grid>




        </div>
    )
}
