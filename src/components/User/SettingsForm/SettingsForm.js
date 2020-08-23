import React from 'react'
import { Button } from 'semantic-ui-react'
import useAuth from '../../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import PasswordForm from '../PasswordForm/PasswordForm'
import EmailForm from '../EmailForm/EmailForm'
import DescriptionForm from '../DescriptionForm/DescriptionForm'
import WebSiteForm from '../WebSiteForm/WebSiteForm'
import './SettingsForm.scss'

export default function SettingsForm(props) {

    const history = useHistory()

    const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } = props

    const { logOut } = useAuth()

    const client = useApolloClient()

    const onLogOut = () => {
        client.clearStore()
        logOut()
        history.push("/")
    }

    const onChangePassword = () => {
        setTitleModal('Cambiar contraseña')
        setChildrenModal(<PasswordForm />)
    }

    const onChangeEmail = () => {
        setTitleModal('Cambiar Email')
        setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch}/>)
    }

    const onChangeDescription = () => {
        setTitleModal('Cambiar Descripción')
        setChildrenModal(<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />)
    }

    const onChangeWebSite = () => {
        setTitleModal('Cambiar Sitio Web')
        setChildrenModal(<WebSiteForm setShowModal={setShowModal} currentWebSite={getUser.website} refetch={refetch} />)
    }
 
    return (
        <div className='settings-form'>
            <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar Email</Button>
            <Button onClick={onChangeDescription}>Descripción</Button>
            <Button onClick={onChangeWebSite}>Sitio Web</Button>
            <Button onClick={onLogOut}><span style={{color: 'red'}}>Cerrar Sesión</span></Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    )
}
