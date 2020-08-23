import React, { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'
import logo from '../../assests/img/instaclone.png'
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm'
import LoginForm from '../../components/Auth/LoginForm/LoginForm'
import "./Auth.scss"

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <Container fluid className='auth'>
            <Image src={logo} className='img' />
            
            <div className='container-form'>
                {showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} />}
            </div>

            <div className='change-form'>
                <p>
                    {
                        showLogin ? (
                            <>
                                ¿No tienes cuenta? <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
                            </>
                        ) : (
                                <>
                                    ¿Ya tienes cuenta? <span onClick={() => setShowLogin(!showLogin)}>Inicia Sesión</span>
                                </>
                            )
                    }
                </p>
            </div>
        </Container>
    )
}
