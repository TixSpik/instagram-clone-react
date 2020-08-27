import React, { useState } from 'react'
import { Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import ImgNotFound from '../../../assests/img/avatar.png'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import ModalUpload from '../../Modal/ModalUpload/ModalUpload'
import './RightHeader.scss'

export default function RightHeader() {

    const { auth } = useAuth()
    const [showModal, setShowModal] = useState(false)

    const { data, error, loading } = useQuery(GET_USER, {
        variables: {
            username: auth.username
        }
    })

    if (loading || error) {
        return null
    }

    const { getUser } = data

    return (
        <React.Fragment>
            <div className='right-header'>
                <Link to='/'>
                    <Icon name='home' />
                </Link>
                <Icon name='plus' onClick={() => setShowModal(true)} />
                <Link to={`/${auth.username}`}>
                    <Image src={getUser.avatar ? getUser.avatar : ImgNotFound} avatar />
                </Link>
            </div>
            <ModalUpload show={showModal} setShow={setShowModal} />
        </React.Fragment>
    )
}
