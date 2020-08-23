import React from 'react'
import Header from '../components/Header/Header'
import { Container } from 'semantic-ui-react'

export default function LayoutBasic(props) {
    return (
        <>
            <Header />
            <Container className='layout-basic'>
                {props.children}
            </Container>
        </>
    )
}
