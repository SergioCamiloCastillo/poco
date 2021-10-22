import React from 'react'

export default function RegisterForm(props) {
    const {handleLoginForm} = props; 
    return (
        <div>
            <h1>Estamos en el register form</h1>
            <button onClick={handleLoginForm}>Ir al login</button>
        </div>
    )
}
