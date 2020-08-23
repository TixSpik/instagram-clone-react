import React from 'react'
import { Image } from 'semantic-ui-react'
import ImgNotFound from '../../../assests/img/avatar.png'
import { useHistory } from 'react-router-dom'
import './ListUsers.scss'

export default function ListUsers({ users, setShowModal }) {

    const history = useHistory()

    const goProfileUser = (username) => {
        setShowModal(false)
        history.push(`/${username}`)
    }

    return (
        <div className='list-users'>
            {!users.length ?
                <p className='list-users__not-users'>No se encontraron seguidores</p> :
                users.map((user, idx) => (
                    <div key={idx} className='list-users__user' onClick={() => goProfileUser(user.username)}>
                        <Image src={user.avatar || ImgNotFound} avatar />
                        <div>
                            <p>{user.name}</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
