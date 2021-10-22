
import { Modal, Icon } from "semantic-ui-react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function BasicModal(props) {
    const { show, setShow, title, children, ...rest } = props;
    const onClose = () => setShow(false);
    return (
        <Modal centered={false} className='basic-modal' open={show} onClose={onClose} {...rest}>
            <Modal.Header className='basic-modal__header'>
               
                <span>{title}</span>
                <FontAwesomeIcon  icon={faTimes} onClick={onClose} />

            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>

        </Modal>
    )
}
