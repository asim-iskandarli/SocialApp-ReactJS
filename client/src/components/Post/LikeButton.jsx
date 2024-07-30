import React, { useEffect, useState } from 'react'
import { Icon } from '../../globalStyles'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { LIKE_POST, UNLIKE_POST } from '../../graphql/mutations/postMutations';
import { updatePost } from '../../redux/slices/postSlice';
import { updateUserPost } from '../../redux/slices/profileSlice';


const LikeButton = ({post}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {user} = useSelector(state => state.userReducer)
  
  const dispatch = useDispatch();

  const [likePost_] = useMutation(LIKE_POST, {
    onError: (error) => {
      console.log(error);
    }
  })
  const [unlikePost_] = useMutation(UNLIKE_POST, {
    onError: (error) => {
      console.log({error});
    }
  })

  
  useEffect(()=>{
    if(post.likes?.find(l => {
      return l.id === user.id
    })) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [post.likes, user.id])


  const likePost = (postId) => {
    setIsLiked(true)
    const newPost = {...post, likes: [...post.likes, user]}
    dispatch(updatePost(newPost))
    dispatch(updateUserPost(newPost))
    likePost_({
      variables: {
        postId,
        likedId: user.id
      }
    })

  }

  const unlikePost = (postId) => {
    const newPost = {...post, likes: post.likes.filter(l => l.id !== user.id)}
    dispatch(updatePost(newPost))
    dispatch(updateUserPost(newPost))
    unlikePost_({
      variables: {
        postId,
        unlikedId: user.id
      }
    })
    setIsLiked(false)
  }

  return (
    <>
    {
      isLiked ?
      <Icon onClick={() => unlikePost(post.id)}><AiFillHeart size={20} color='#55c2da'/></Icon> :
      <Icon onClick={() => likePost(post.id)}><AiOutlineHeart size={20} /></Icon>
    }
    </>
    
  )
}

export default LikeButton