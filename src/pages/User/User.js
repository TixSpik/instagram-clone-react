import React from 'react'
import Profile from '../../components/User/Profile/Profile'
import { useParams } from 'react-router-dom'

export default function User() {

    const { username } = useParams()

    return (
        <>
            <Profile username={username} />
        </>
    )
}
