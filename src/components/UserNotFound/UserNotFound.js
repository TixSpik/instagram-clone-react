import React from 'react'
import { Link } from 'react-router-dom'
import './UserNotFound.scss'

export default function UserNotFound() {
    return (
        <div className='user-not-found'>
            <p>Usuario no encontrado</p>
            <p>Opps... al parecer la cuenta no existe o ya fue eliminada.</p>
            <Link to=''>
                Ir a la inicio
            </Link>
        </div>
    )
}
