import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import { Grid, Image } from 'semantic-ui-react'
import ImageNotFound from '../../../assests/img/avatar.png'
import UserNotFound from '../../UserNotFound/UserNotFound'
import ModalBasic from '../../Modal/Modal'
import AvatarForm from '../AvatarForm/AvatarForm'
import useAuth from '../../../hooks/useAuth'
import HeaderProfile from './HeaderProfile/HeaderProfile'
import SettingsForm from '../SettingsForm/SettingsForm'
import Followers from './Followers/Followers'
import './Profile.scss'

export default function Profile(props) {

    const { username } = props
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [childrenModal, setChildrenModal] = useState(null)
    const { auth } = useAuth()


    const { data, loading, error,refetch } = useQuery(GET_USER, {
        variables: {
            username
        }
    })

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <UserNotFound />
        )
    }

    const { getUser } = data
    console.log(getUser)

    const handleModal = (type) => {
        switch (type) {
            case 'avatar':
                setTitleModal('Cambiar foto de perfil')
                setChildrenModal(
                    <AvatarForm
                    auth={auth} setShowModal=
                    {setShowModal}
                />)
                setShowModal(true)
                break;
            
            case 'settings':
                setTitleModal('Ajustes')
                setChildrenModal(
                    <SettingsForm
                        setTitleModal={setTitleModal}
                        setChildrenModal={setChildrenModal}
                        setShowModal={setShowModal}
                        getUser={getUser}
                        refetch={refetch}
                    />)
                setShowModal(true)
                break;
            
            default:
                break;
        }
    }

    return (
        <>
            <Grid className='profile'>
                <Grid.Column width={5} className='profile__left'>
                    <Image
                        src={getUser.avatar ? getUser.avatar : ImageNotFound}
                        avatar
                        onClick={() => auth.username === username && handleModal('avatar')}
                    />
                </Grid.Column>
                <Grid.Column width={11} className='profile__right'>
                    <HeaderProfile username={username} auth={auth} handleModal={handleModal} />
                    <Followers username={username} />
                    <div className='other'>
                        <p className='name'>{getUser.name}</p>
                        {getUser.website && (
                            <a href={getUser.website} target='_blank' className='website'>{getUser.website}</a>
                        )}
                        {getUser.description && (
                            <p className='description'>{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
    )
}
