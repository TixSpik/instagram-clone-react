import React, { useState, useEffect } from 'react'
import { Search as SearchSemantic, Image } from 'semantic-ui-react'
import { SEARCH } from '../../../gql/user'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import ImageNotFound from '../../../assests/img/avatar.png'
import './Search.scss'

export default function Search() {

    const [search, setSearch] = useState(null)
    const [result, setResult] = useState([])
    const { data, loading } = useQuery(SEARCH, {
        variables: { search }
    })
    
    useEffect(() => {
        if (data?.search) {
            const users = []
            data.search.forEach((user, idx) => {
                users.push({
                    key: idx,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar
                })
            })

            return setResult(users)
        }
        return setResult([])
    }, [data])

    const onChange = (e) => {
        if (e.target.value) {
            return setSearch(e.target.value)
        }
        return setSearch(null)
    }

    const handleSelect = () => {
        setSearch(null)
        setResult([])
    }

    return (
        <SearchSemantic
            className='search-users'
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            loading={loading}
            onSearchChange={onChange}
            value={search || ''}
            results={result}
            resultRenderer={(e) => <ResultSearch data={e} />}
            onResultSelect={handleSelect}
            noResultsMessage={<div>No se contraron resultados</div>}
        />
    )
}

function ResultSearch(props) {
    const { data } = props
    console.log(data)
    return (
        <Link className='search-users__item' to={`/${data.username}`}>
            <Image
                src={data.avatar || ImageNotFound}
            />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
}