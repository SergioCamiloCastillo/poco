import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function ChangeNameForm(props) {
    const { user } = props;
  
    return (
        <div className='change-name-form'>

            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Nombres</label>
                        <Form.Input name='name' placeholder="Tu nuevo nombre" ></Form.Input>

                    </Form.Field>
                    <Form.Field>
                        <label>Apellidos</label>
                        <Form.Input name='lastname' placeholder="Tus nuevos apellidos" ></Form.Input>

                    </Form.Field>

                </Form.Group>
                <Button className='submit'>Actualizar</Button>
            </Form>
        </div>
    )
}
