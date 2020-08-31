import React, { useEffect } from 'react'
import Profile from '../../components/User/Profile/Profile'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_POSTS } from '../../gql/post'
import Posts from '../../components/Posts/Posts'

export default function User() {

    const { username } = useParams()
    const { data, loading, startPolling, stopPolling } = useQuery(GET_POSTS, {
        variables: { username }
    })

    useEffect(() => {
        startPolling(1100)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return null

    const { getPosts } = data
    console.log(getPosts.length)

    return (
        <>
            <Profile username={username} postLength={getPosts.length} />
            <Posts posts={getPosts} />
        </>
    )
}
