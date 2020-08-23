import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS } from '../../../../gql/follow'
import Modal from '../../../Modal/Modal'
import ListUsers from '../../ListUsers/ListUsers'
import './Followers.scss'

export default function Followers(props) {

    const { username } = props
    
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [childrenModal, setChildrenModal] = useState(null)

    const { data: dataFollowers, loading: loadingFollowers, startPolling: startPollingFollowers, stopPolling: stopPollingFollowers } = useQuery(GET_FOLLOWERS, {
        variables: {
            username
        }
    })

    useEffect(() => {
        startPollingFollowers(1100)
        return () => {
            stopPollingFollowers()
        }
    }, [startPollingFollowers, stopPollingFollowers])

    if (loadingFollowers) return null

    const openFollowersModal = () => {
        setTitleModal('Seguidores')
        setChildrenModal(<ListUsers users={dataFollowers.getFollowers} setShowModal={setShowModal}/>)
        setShowModal(true)
    }

    return (
        <React.Fragment>
            <div className='followers'>
                <p>
                    <span>*</span> publicaciones
                </p>
                <p className='link' onClick={openFollowersModal}>
                    <span>{dataFollowers.getFollowers.length}</span> seguidores
                </p>
                <p className='link'>
                    <span>*</span> seguidos
                </p>
            </div>
            <Modal show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </Modal>
        </React.Fragment>
    )
}
