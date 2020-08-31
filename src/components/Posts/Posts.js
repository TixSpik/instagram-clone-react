import React from 'react'
import { Grid } from 'semantic-ui-react'
import './Posts.scss'
import ImgPost from './ImgPost/ImgPost'

export default function Posts({ posts }) {

    console.log(posts)

    return (
        <div className='posts'>
            <h1>Publicaciones</h1>
            <Grid columns={4}>
                {
                    posts.length > 0 && (
                        posts.map((post, idx) => (
                            <Grid.Column key={idx} className='posts__column'>
                                <ImgPost post={post} />
                            </Grid.Column>
                        )
                        )
                    )
                }
            </Grid>
        </div>
    )
}
