
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';
import { Image as ImageSemantic } from 'semantic-ui-react'

export default function Header() {
    return (
        <div className='header'>
            <Menu>
            <ImageSemantic src='/logo.svg' size='small' />

            <Menu.Item />
                <Menu.Item
                    name='Home'

                />
                <Dropdown item text='Menu' simple>
                    <Dropdown.Menu>

                        <Dropdown.Item  href='http://google.com'>Todo</Dropdown.Item>
                        <Dropdown.Item>Hamburguesas</Dropdown.Item>
                        <Dropdown.Item>Pizzas</Dropdown.Item>
                        <Dropdown.Item>Empanadas</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    name='Nosotros'

                />
                <Menu.Item
                    name='Contacto'

                />

            </Menu>
        </div>
    )
}
