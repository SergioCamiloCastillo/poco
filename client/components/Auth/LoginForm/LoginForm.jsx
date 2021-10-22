import React from 'react'

export default function LoginForm(props) {
    const {handleRegisterForm} = props;
    return (
        <div>
            <h1>Estamos en el formulario de login form</h1>
            <button onClick={handleRegisterForm}>Ir al registro</button>
        </div>
    )
}
