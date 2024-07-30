import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../globalStyles'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../graphql/mutations/postMutations'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../redux/slices/postSlice'
import { PuffLoader } from 'react-spinners'
import AvatarComponent from '../Avatar'
import { createUserPost } from '../../redux/slices/profileSlice'

const CreatePostComponent = () => {
    const [content, setContent] = useState("")
    const { user } = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const [postCreate, { loading }] = useMutation(CREATE_POST, {
        onCompleted: (data) => {
            const newPost = {
                author: user,
                likes: [],
                ...data.createPost
            }
            dispatch(createPost(newPost));
            dispatch(createUserPost(newPost));
            setContent("")
        },
        onError: (error) => {
            console.log({ error })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()) return;
        postCreate({
            variables: {
                content,
                authorId: user.id
            }
        })
    }
    return (
        <CreatePostBox>
            <AvatarComponent width={60} height={60} avatar={user.avatar} />
            <form onSubmit={handleSubmit}>
                <input placeholder='Share new post' onChange={(e) => { setContent(e.target.value) }} value={content} />
                <Button disabled={loading}> {loading ? <PuffLoader color='#36d7b7' size={40} /> : 'Create'}</Button>
            </form>
        </CreatePostBox>
    )
}

export default CreatePostComponent

const CreatePostBox = styled.div`
    width: var(--width-screen);
    height: max-content;
    border-radius: 1rem;
    padding: 10px;
    margin-top: 1rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    form {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-left: 5px;
        input {
        background-color: #eee;
        width: 100%;
        height: 40px;
        }
        button {
            width: 150px;
            height: 40px;
        }
    }
    
`;