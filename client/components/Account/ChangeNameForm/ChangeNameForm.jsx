import { replace, useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Form, Button } from 'semantic-ui-react';
import * as Yup from "yup";
import { updateNameApi } from 'api/user';

export default function ChangeNameForm(props) {
    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname, user.email),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout);

            if (!response) {
                toast.error("Error al actualizar datos");
                setLoading(false);
            }
            else if (response?.statusCode === 400) {
                toast.error("Correo electronico asignado a otro usuario");
                setLoading(false);
            }
            else {
                toast.success("Datos Actualizados")
                setReloadUser(true);

                setLoading(false);
            }
        }

    });

    return (
        <div className='change-name-form'>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Nombres</label>
                        <Form.Input name='name' placeholder="Tu nuevo nombre" onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name}></Form.Input>

                    </Form.Field>
                    <Form.Field>
                        <label>Apellidos</label>
                        <Form.Input name='lastname' placeholder="Tus nuevos apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}></Form.Input>

                    </Form.Field>



                </Form.Group>
                {/*   <div className='text-email-currently'>
                    <label>Correo electronico registrado actualmente: <h3>{user.email}</h3></label>
                </div>
 */}
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Nuevo Correo Electrónico</label>
                        <Form.Input name='email' placeholder="Nuevo Correo Electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}></Form.Input>

                    </Form.Field>
                    <Form.Field>
                        <label>Repetir Nuevo Correo Electrónico</label>
                        <Form.Input name='repeatEmail' placeholder="Repetir Nuevo Correo Electronico" onChange={formik.handleChange} value={formik.values.repeatEmail} error={formik.errors.repeatEmail}></Form.Input>

                    </Form.Field>
                </Form.Group>



                <Button className='submit' loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}
const initialValues = (name, lastname, email) => {

    return {
        name: name || "",
        lastname: lastname || "",
        email: email || "",
        repeatEmail: email || "",

    }
}
const validationSchema = () => {
    return {
        name: Yup.string().required("Campo Requerido"),
        lastname: Yup.string().required("Campo Requerido"),
        email: Yup.string().email("Correo electronico invalido").required("Campo requerido").oneOf([Yup.ref("repeatEmail")], "Campos Email no son iguales"),
        repeatEmail: Yup.string().email("Correo electronico invalido").required("Campo requerido").oneOf([Yup.ref("email")], "Campos Email no son iguales"),



    }
}
