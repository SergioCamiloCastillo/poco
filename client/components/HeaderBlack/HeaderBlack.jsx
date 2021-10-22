import React from 'react'
import { Grid } from 'semantic-ui-react'
import { faPhone,faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faTwitter, faInstagram, faYoutube, faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
export default function HeaderBlack() {
    return (
        <div className="header-black">
            <Grid>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <div className='contact'>
                        <div className='contact__phone'><FontAwesomeIcon icon={faPhone} />&nbsp;&nbsp;`Llámanos: +601 5410113</div>
                        <div className='contact__location'><FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;&nbsp;Cra 99#65a-50 Bogota, Colombia</div>
                    </div>

                </Grid.Column>

                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <div class='social-links'>
                        <a href="#"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faWhatsapp} size="lg" /></a>

                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}
