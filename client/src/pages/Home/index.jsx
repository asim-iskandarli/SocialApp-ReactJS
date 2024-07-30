import React from 'react'
import { Container, HomePosts, PostLoad } from './styled';
import CreatePost from '../../components/Home/CreatePost';
import {useSelector } from 'react-redux';
import PostComponent from '../../components/Post';
import { PuffLoader } from 'react-spinners';


const HomePage = () => {
    const { posts, postsLoad } = useSelector(state => state.postReducer)

    return (
        <Container>
            <CreatePost />
            <HomePosts>
                {
                    postsLoad ? <PostLoad><PuffLoader color='#36d7b7' size={50} /></PostLoad> :
                        posts?.map(post => (
                            <PostComponent key={post.id} post={post} />
                        ))
                }
            </HomePosts>
        </Container>
    )
}

export default HomePage