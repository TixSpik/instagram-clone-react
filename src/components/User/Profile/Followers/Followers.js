import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow'
import Modal from '../../../Modal/Modal'
import ListUsers from '../../ListUsers/ListUsers'
import './Followers.scss'

export default function Followers(props) {

    const { username, postLength } = props

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [childrenModal, setChildrenModal] = useState(null)

    const { data: dataFollowers, loading: loadingFollowers, startPolling: startPollingFollowers, stopPolling: stopPollingFollowers } = useQuery(GET_FOLLOWERS, {
        variables: {
            username
        }
    })

    const { data: dataFolloweds, loading: loadingFolloweds, startPolling: startPollingFolloweds, stopPolling: stopPollingFolloweds } = useQuery(GET_FOLLOWEDS, {
        variables: { username }
    })

    useEffect(() => {
        startPollingFollowers(1100)
        startPollingFolloweds(900)
        return () => {
            stopPollingFollowers()
            startPollingFolloweds()
        }
    }, [startPollingFollowers, stopPollingFollowers.startPollingFolloweds, stopPollingFolloweds])

    if (loadingFollowers || loadingFolloweds) return null

    const openFollowersModal = () => {
        setTitleModal('Seguidores')
        setChildrenModal(<ListUsers users={dataFollowers.getFollowers} setShowModal={setShowModal} />)
        setShowModal(true)
    }

    const openFollowedsModal = () => {
        setTitleModal('Seguidos')
        setChildrenModal(<ListUsers users={dataFolloweds.getFolloweds} setShowModal={setChildrenModal} />)
        setShowModal(true)
    }

    return (
        <React.Fragment>
            <div className='followers'>
                <p>
                    <span>{postLength}</span> publicaciones
                </p>
                <p className='link' onClick={openFollowersModal}>
                    <span>{dataFollowers.getFollowers.length}</span> seguidores
                </p>
                <p className='link' onClick={openFollowedsModal}>
                    <span>{dataFolloweds.getFolloweds.length}</span> seguidos
                </p>
            </div>
            <Modal show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </Modal>
        </React.Fragment>
    )
}
