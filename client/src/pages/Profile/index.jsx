import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Body, Header, HeaderLeft, HeaderRight, NoPost, ProfileContainer, UserInfo, UserLoad, UserPosts, Top, Bottom, EditButton } from './styled'
import AvatarComponent from '../../components/Avatar'
import PostComponent from '../../components/Post'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries/userQueries'
import { PostLoad } from '../Home/styled'
import { PuffLoader } from 'react-spinners'
import { HiCalendarDays } from 'react-icons/hi2'
import moment from 'moment'
import EditUserModal from '../../components/EditUser'
import { getUser } from '../../redux/slices/profileSlice'

const ProfilePage = () => {
  const { id } = useParams()
  const { user } = useSelector(state => state.userReducer);
  const { users } = useSelector(state => state.profileReducer);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [editUser, setEditUser] = useState(false);

  const [getUserQuery, { loading }] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      setUserData(data.getUser)
      dispatch(getUser(data.getUser));
    },
    onError: (error) => {
      console.log(error);
    }
  })

  useEffect(() => {
    if (!id || id === user.id) {
      if (users.every(item => item.id !== user.id)) {
        getUserQuery({ variables: { id } })
      } else {
        users.forEach(data => {
          if (data.id === user.id) {
            setUserData(data);
          }
        })
      }
    } else if (users.every(item => item.id !== id)) {
      getUserQuery({ variables: { id } })
    } else {
      users.forEach(data => {
        if (data.id === id) {
          setUserData(data);
        }
      })
    }

  }, [dispatch, getUserQuery, id, user, users])

  return (
    <ProfileContainer>
      {
        editUser &&
        <EditUserModal setEditUser={setEditUser} />
      }
      <Header>
        {
          loading ? <UserLoad><PuffLoader color='#36d7b7' size={50} /></UserLoad> :
            <>
              <Top>
                <HeaderLeft>
                  <AvatarComponent avatar={userData?.avatar} width={150} height={150} />
                  <UserInfo>
                    <h3>{userData?.username}</h3>
                    {
                      userData?.fullname &&
                      <h5>{userData.fullname}</h5>
                    }

                  </UserInfo>
                </HeaderLeft>
                <HeaderRight>
                  {
                    userData?.id === user.id &&
                    <EditButton onClick={() => setEditUser(true)}>Edit</EditButton>
                  }
                </HeaderRight>
              </Top>
              <Bottom>
                <p>Posts <strong>{userData?.posts ? userData.posts.length : 0}</strong> </p>
                {
                  userData?.createdAt &&
                  <p><HiCalendarDays color='#363636' size={18} /> <strong>Registered</strong> {moment(userData.createdAt).format('LL')}</p>
                }
              </Bottom>
            </>
        }
      </Header>
      <Body>
        {
          loading ? <PostLoad><PuffLoader color='#36d7b7' size={50} /></PostLoad> :
            <UserPosts>
              {
                userData?.posts.length > 0 ?
                  userData.posts.map(post => (
                    <PostComponent key={post.id} post={post} />
                  )) :
                  <NoPost><h1>No posts yet.</h1></NoPost>
              }
            </UserPosts>
        }
      </Body>
    </ProfileContainer>
  )
}

export default ProfilePage