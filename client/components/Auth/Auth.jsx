import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth(props) {
    const { onCloseModal, setTitleModal } = props;
    const [showLogin, setShowLogin] = useState(true);


    const handleLoginForm = () => {
        setTitleModal("Iniciar Sesión");
        setShowLogin(true)
    };
    const handleRegisterForm = () => {
        setTitleModal("Registrarse");

        setShowLogin(false);
    }

    return showLogin ? <LoginForm handleRegisterForm={handleRegisterForm} /> : <RegisterForm handleLoginForm={handleLoginForm} />
}
