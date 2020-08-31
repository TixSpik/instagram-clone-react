import React from 'react'
import { Image } from 'semantic-ui-react'
import './ImgPost.scss'

export default function ImgPost({ post }) {

    return (
        <>
            <div className='post'>
                <Image className='post__img' src={post.file} />
            </div>
        </>
    )
}
