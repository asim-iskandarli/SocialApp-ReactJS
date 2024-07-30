import React, { useState } from 'react'
import styled from 'styled-components'
import UserCard from '../UserCard'
import { AiOutlineDelete } from 'react-icons/ai'
import { Icon } from '../../globalStyles'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { DELETE_POST } from '../../graphql/mutations/postMutations'
import { deletePost } from '../../redux/slices/postSlice'
import { PuffLoader } from 'react-spinners'
import LikeButton from './LikeButton'
import ShowLikes from './ShowLikes'
import { deleteUserPost } from '../../redux/slices/profileSlice'

const PostComponent = ({ post }) => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [showLikes, setShowLikes] = useState(false);

  const [deletePost_, { loading: loadDelete }] = useMutation(DELETE_POST, {
    onError: (error) => {
      console.log(error);
    }
  })

  const postDelete = (postId) => {
    dispatch(deletePost({ id: post.id }))
    dispatch(deleteUserPost({ id: post.id, authorId: post.author.id }))
    deletePost_({
      variables: {
        postId
      }
    })
  };

  return (
    <Card>
      <CardHeader>
        <Link to={`/profile/${post.author.id}`}><UserCard user={post.author} /></Link>
        {
          post.author.id === user.id &&
          <RightBtn>
            {
              loadDelete ? <PuffLoader color='var(--danger)' size={24} /> :
                <Icon onClick={() => postDelete(post.id)}><AiOutlineDelete color='var(--danger)' size={20} /></Icon>
            }
          </RightBtn>
        }
      </CardHeader>
      <CardBody>
        <p>{post.content}</p>
      </CardBody>
      <CardFooter>
        <FooterTop>
          <span><LikeButton post={post} /> <strong onClick={() => setShowLikes(true)}>{post.likes ? post.likes.length : 0}</strong></span>

          <span>{moment(post.createdAt).fromNow()}</span>
          {
            showLikes &&
            <ShowLikes title={'Likes'} setShowLikes={setShowLikes} users={post.likes} />
          }
        </FooterTop>
      </CardFooter>
    </Card>
  )
}

export default PostComponent;

const Card = styled.div`
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 1rem;
  margin-bottom: 10px;
`;

const CardHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightBtn = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardBody = styled.div`
  padding: 10px;
  p {
    word-wrap: break-word;
  }
`;
const CardFooter = styled.div`
  
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  span {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #757575;
    strong {
      color: #3f3f3f;
      margin-left: 3px;
      cursor: pointer;
    }
  }
`;
