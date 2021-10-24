import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { registerApi } from 'api/user';
import {toast} from "react-toastify";

export default function RegisterForm(props) {
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(true);
    const { handleLoginForm } = props;
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => { //trae lo que vienen del formulario
            setLoading(true);
            const response = await registerApi(formData);//espera este llamado de registro para que siga con la ejecucion del codigo
           
            if(response?.jwt){ //con el ? es decir si le llega un objeto con la propiedad jwt
                toast.success("Registrado con exito");
                handleLoginForm();

            }else{
                console.log(response.data[0].messages[0].message);
                toast.error("Username o correo electronico ya esta regsitrado, pruebe con uno diferente");
            }
            setLoading(false);
        }

    });
    const handleShowError = () => {
        setShowError(true);
    }
    return (
        <Form className='login-form' onSubmit={formik.handleSubmit}>

            <Form.Field>
                <label>Nombres</label>
                {showError ? <Form.Input placeholder='Nombres' name='name' type='text' onChange={formik.handleChange} error={formik.errors.name} /> : <Form.Input placeholder='Nombres' name='name' type='text' onChange={formik.handleChange} />}

            </Form.Field>
            <Form.Field>
                <label>Apellidos</label>
                {showError ? <Form.Input placeholder='Apellidos' name='lastname' type='text' onChange={formik.handleChange} error={formik.errors.lastname} />
                    : <Form.Input placeholder='Apellidos' name='lastname' type='text' onChange={formik.handleChange} />
                }
            </Form.Field>
            <Form.Field>
                <label>Correo Electrónico</label>
                {showError ? <Form.Input placeholder='Correo Electrónico' name='email' type='text' onChange={formik.handleChange} error={formik.errors.email} />
                    : <Form.Input placeholder='Correo Electrónico' name='email' type='text' onChange={formik.handleChange} />
                }
            </Form.Field>
            <Form.Field>
                <label>Username</label>
                {showError ? <Form.Input placeholder='Nombre de usuario' name='username' type='text' onChange={formik.handleChange} error={formik.errors.username} />
                    : <Form.Input placeholder='Nombre de usuario' name='username' type='text' onChange={formik.handleChange} />
                }
            </Form.Field>
            <Form.Field>
                <label>Contraseña</label>
                {showError ? <Form.Input placeholder='Contraseña' name='password' type='password' onChange={formik.handleChange} error={formik.errors.password} />
                    : <Form.Input  placeholder='Contraseña' name='password' type='password' onChange={formik.handleChange} />
                }
            </Form.Field>
            <div className='actions'>
                <Button type='button' onClick={handleLoginForm}>Iniciar Sesión</Button>
                <Button type='submit' className='submit' onClick={handleShowError}>Registrar</Button>
            </div>
        </Form>
    )
}

const initialValues = () => {
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        role: "consumidor"
    }
}
const validationSchema = () => {
    return {
        name: Yup.string().required("Nombre  obligatorio"),
        lastname: Yup.string().required("Apellido obligatorio"),
        username: Yup.string().required("Username obligatorio"),
        email: Yup.string().email("Email invalido").required("Email obligatorio"),
        password: Yup.string().required("Contraseña obligatoria").min(8),

    }
}
