import { replace, useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Form, Button } from 'semantic-ui-react';
import * as Yup from "yup";
import { updatePasswordApi } from 'api/user';

export default function ChangePassword(props) {
    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname, user.email),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordApi(user.id, formData.password, logout);

            if (!response) {
                toast.error("Error al actualizar contraseña");
                setLoading(false);
            }
            else if (response?.statusCode === 400) {
                toast.error("Correo electronico asignado a otro usuario");
                setLoading(false);
            }
            else {
                toast.success("Datos Actualizados")
                logout();

            }
            setLoading(false);

        }

    });

    return (
        <div className='change-name-form'>

            <Form onSubmit={formik.handleSubmit}>

                <br />
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Nuevo Contraseña</label>
                        <Form.Input name='password' placeholder="Nueva Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}></Form.Input>

                    </Form.Field>
                    <Form.Field>
                        <label>Repetir Nueva Contraseña</label>
                        <Form.Input name='repeatPassword' placeholder="Repetir Nueva Contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}></Form.Input>

                    </Form.Field>
                </Form.Group>


                <Button className='submit' loading={loading}>Actualizar Contraseña</Button>
            </Form>
        </div>
    )
}
const initialValues = (name, lastname, email) => {

    return {
     
        password: "",
        repeatPassword: ""
    }
}
const validationSchema = () => {
    return {
      
        password: Yup.string().min(8).oneOf([Yup.ref("repeatPassword")], "Campos Email no son iguales"),
        repeatPassword: Yup.string().min(8).oneOf([Yup.ref("password")], "Campos Email no son iguales"),


    }
}
