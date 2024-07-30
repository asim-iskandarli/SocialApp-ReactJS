import React from 'react'
import styled from 'styled-components'
import { Icon, ModalBox, ModalHeader } from '../../globalStyles';
import { AiOutlineClose } from 'react-icons/ai';
import UserCard from '../UserCard'
import { Link } from 'react-router-dom';

const ShowLikes = ({ setShowLikes, title, users }) => {
  return (
    <FollowModal>
      <ModalBox>
        <ModalHeader>
          <h3>{title}</h3>
          <Icon onClick={() => setShowLikes(false)}><AiOutlineClose size={20} /></Icon>
        </ModalHeader>
        <UserList>
          {
            users.length > 0 ?
              users.map(user => (
                <User key={user.id}>
                  <Link to={`/profile/${user.id}`}>
                    <UserCard user={user} key={user.id} />
                  </Link>
                </User>
              ))
              :
              <h2>No likes yet</h2>
          }
        </UserList>
      </ModalBox></FollowModal>
  )
}

const FollowModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff9c;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const UserList = styled.div`
  width: 100%;
  min-height: 30vh;
  max-height: 60vh;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  h2 {
    color: #353535;
  }
`;

const User = styled.div`
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
`;

export default ShowLikes