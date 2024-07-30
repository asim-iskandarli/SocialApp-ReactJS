import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'
import { Button, Icon, ModalBody, ModalBox, ModalHeader } from '../globalStyles'
import { PuffLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../graphql/mutations/userMutations'
import {updateUser} from '../redux/slices/userSlice'
import { updateProfileUser } from '../redux/slices/profileSlice'

const EditUser = ({setEditUser}) => {
  const {user} = useSelector(state => state.userReducer);
  const [error, setError] = useState('')

  const initialState = {username: '', fullname: '', email: ''}
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();

  const [userUpdate, {loading}] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      dispatch(updateUser(userData));
      dispatch(updateProfileUser({...userData, id: user.id}))
      setEditUser(false);
    },
    onError: (error) => {
      if(error.graphQLErrors[0].message === "User already exists") {
        setError(error.graphQLErrors[0].message)
      } else {
        setError('Something went wrong. Please try again');
      }
    }
  })

  useEffect(()=> {
    const {username, fullname, email} = user;
    setUserData({username, fullname, email})
  }, [user])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    userUpdate({
      variables: {
        ...userData
      }
    })
  }


  return (
    <EditModal>
      <ModalBox>
        <ModalHeader>
          <h3>Edit Profile</h3>
          <Icon onClick={() => setEditUser(false)}><AiOutlineClose size={20}/></Icon>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
          {
            error && 
            <h4>{error}</h4>
          }
            <InputFiled>
              <label htmlFor='username'>Username</label>
              <input id='username' type='text' name='username' placeholder='Enter Username' onChange={handleChangeInput} value={userData.username}/>
            </InputFiled>
            <InputFiled>
              <label htmlFor='fullname'>Fullname</label>
              <input id='fullname' type='text' name='fullname' placeholder='Enter Fullname' onChange={handleChangeInput} value={userData.fullname}/>
            </InputFiled>
            <InputFiled>
              <label htmlFor='email'>Email</label>
              <input id='email' type='text' name='email' placeholder='Enter Email' onChange={handleChangeInput} value={userData.email}/>
            </InputFiled>
            <Button disabled={false} type='submit'> {loading ? <PuffLoader color='#36d7b7' size={40} /> : 'SAVE'}</Button>
          </form>
        </ModalBody>
      </ModalBox>
    </EditModal>
  )
}

const EditModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #00000088;
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    color: var(--danger);
  }
`;


export const InputFiled = styled.div`
    width: 100%;
    label {
        color: #505050;
        font-weight: 600;
        margin-left: 5px;
    }
    input{
        width: 100%;
        height: 40px;
        padding-left: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
    }
`;


export default EditUser