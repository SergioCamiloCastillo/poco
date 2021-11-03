import { createAddressAPi, updateAddressApi } from 'api/address';
import { useFormik } from 'formik'
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Form, Button } from 'semantic-ui-react'
import * as Yup from "yup";

export default function AddressForm(props) {
    const { setShowModal, setReloadAddresses, newAddress, address } = props;

    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            newAddress ? createAddress(formData) : updateAddress(formData);
        }
    });
    const updateAddress = async (formData) => {
        setLoading(true);

        const formDataTemp = {
            ...formData,
            usuario: auth.idUser
        }

        const response = updateAddressApi(address.id, formDataTemp, logout);
        if (!response) {
            toast.warning("Error al actualizar la dirección");
            setLoading(false);
        } else {
            formik.resetForm();
            setLoading(false);
            setReloadAddresses(true);
            setShowModal(false);
            toast.warning("Dirección Actualizada");
        }
    }
    const createAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            usuario: auth.idUser
        }// A los datos que trae formdata (datos que vienen del formulario), le añadimos el objeto user, que es el id de el usuario autenticado en ese momento
        const response = await createAddressAPi(formDataTemp, logout);
        if (!response) {
            toast.warning("Error al crear la dirección.");
            setLoading(false);
        } else {
            formik.resetForm();
            setLoading(false);
            setReloadAddresses(true);
            setShowModal(false);
            toast.warning("Dirección guardada");

        }
        setLoading(false);
    }
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input name='title' type='text' label='Titulo de la dirección' placeholder='Titulo de la Dirección' onChange={formik.handleChange} value={formik.values.title} error={formik.errors.title}></Form.Input>
            <Form.Group widths='equal'>
                <Form.Input name='name' type='text' label='Nombre y Apellidos' placeholder='Nombres y Apellidos' onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name}></Form.Input>
                <Form.Input name='address' type='text' label='Dirección' placeholder='Dirección' onChange={formik.handleChange} value={formik.values.address} error={formik.errors.address}></Form.Input>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input name='city' type='text' label='Ciudad' placeholder='Ciudad' onChange={formik.handleChange} value={formik.values.city} error={formik.errors.city}></Form.Input>
                <Form.Input name='state' type='text' label='Estado/Provincia/Región' placeholder='Estado/Provincia/Región' onChange={formik.handleChange} value={formik.values.state} error={formik.errors.state}></Form.Input>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input name='phone' type='text' label='Teléfono' placeholder='Teléfono' onChange={formik.handleChange} value={formik.values.phone} error={formik.errors.phone}></Form.Input>
                <Form.Input name='postal' type='text' label='Postal' placeholder='Postal' onChange={formik.handleChange} value={formik.values.postal} error={formik.errors.postal}></Form.Input>
            </Form.Group>
            <div className='actions'>
                <Button className='submit' type='submit' loading={loading}>{newAddress ? 'Crear Dirección' : "Actualizar Dirección"}</Button>
            </div>
        </Form>
    )
}
const validationSchema = () => {
    return {
        title: Yup.string().required("Campo Requerido"),
        name: Yup.string().required("Campo Requerido"),
        address: Yup.string().required("Campo Requerido"),
        city: Yup.string().required("Campo Requerido"),
        state: Yup.string().required("Campo Requerido"),
        postal: Yup.string().required("Campo Requerido"),
        phone: Yup.string().required("Campo Requerido"),


    }
}
const initialValues = (address) => {
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        postal: address?.postal || "",
        phone: address?.phone || ""
    }
}