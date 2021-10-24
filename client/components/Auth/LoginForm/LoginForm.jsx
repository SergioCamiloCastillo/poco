import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi, resetPasswordApi } from 'api/user';
import useAuth from 'hooks/useAuth';

export default function LoginForm(props) {
    const { handleRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [showError, setShowError] = useState(false);



    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            if (response?.jwt) {
                toast.success("Ingresaste con exito");
                login(response.jwt);
                onCloseModal();

            } else {
                toast.error("Email o contraseña son incorrectos");
            }
            setLoading(false);
        },

    });
    const handleShowError = () => {
        setShowError(true);
    }
    const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();
        if (!validateEmail.isValidSync(formik.values.identifier)) {
            formik.setErrors({ identifier: true });
        } else {
            resetPasswordApi(formik.values.identifier);
        }

    }
    return (
        <Form className='login-form' onSubmit={formik.handleSubmit}>
            <Form.Field>
                <label>Username</label>
                {showError ? <Form.Input error={formik.errors.identifier} onChange={formik.handleChange} placeholder='Correo Electronico' name='identifier' type='text' />
                    : <Form.Input onChange={formik.handleChange} placeholder='Correo Electronico' name='identifier' type='text' />
                }

            </Form.Field>
            <Form.Field>
                <label>Contraseña</label>
                {showError ? <Form.Input error={formik.errors.password} onChange={formik.handleChange} placeholder='Contraseña' name='password' type='password' />
                    : <Form.Input onChange={formik.handleChange} placeholder='Contraseña' name='password' type='password' />
                }

            </Form.Field>
            <div className='actions'>
                <Button type='button' basic onClick={handleRegisterForm}>Registrarse</Button>
                <div>
                    <Button className='submit' type='submit' loading={loading} onClick={handleShowError}>Ingresar</Button>
                    <Button type='button' onClick={resetPassword}>¿Has olvidado la contraseña?</Button>
                </div>
            </div>
        </Form>
    )
}

const initialValues = () => {
    return {
        identifier: "",
        password: ""
    }
}
const validationSchema = () => {
    return {
        identifier: Yup.string().email("Correo electronico invalido").required("Campo requerido"),
        password: Yup.string().required("Campo requerido")


    }
}