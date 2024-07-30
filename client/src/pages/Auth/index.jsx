import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, InputFiled } from './styled';
import { Button } from '../../globalStyles';
import { useMutation } from '@apollo/client';
import { USER_SIGNUP } from '../../graphql/mutations/userMutations';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import { PuffLoader } from 'react-spinners'
import { AvatarGenerator } from 'random-avatar-generator';

const SignupPage = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generator = new AvatarGenerator();
  generator.generateRandomAvatar();
  const avatar = generator.generateRandomAvatar()

  const [signup, { loading }] = useMutation(USER_SIGNUP, {
    onCompleted: (data) => {
      dispatch(getUser(data.signup.user));
      localStorage.setItem('userToken', data.signup.token);
      navigate('/');
    },
    onError: (error) => {
      console.log(error)
      if (error.graphQLErrors[0].extensions.code === 'BAD_USER_INPUT') {
        setError(error.graphQLErrors[0].message);
      } else {
        setError('An unexpected error has occurred, please try again');
      }
    }
  });


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.username || !userData.password || !userData.email) {
      return setError('Fields other than fullname cannot be left blank.')
    }
    signup({
      variables: {
        input: { ...userData, avatar: avatar.toString() }
      }
    })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <span style={{ color: '#f05959' }}>{error}</span>
        <InputFiled>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' name='username' placeholder='Enter Username' onChange={handleChangeInput} />
        </InputFiled>
        <InputFiled>
          <label htmlFor='fullname'>Fullname</label>
          <input id='fullname' type='text' name='fullname' placeholder='Enter Fullname' onChange={handleChangeInput} />
        </InputFiled>
        <InputFiled>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' name='email' placeholder='Enter Email' onChange={handleChangeInput} />
        </InputFiled>
        <InputFiled>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' placeholder='Enter Password' onChange={handleChangeInput} />
        </InputFiled>

        <Button disabled={loading} type='submit'> {loading ? <PuffLoader color='#36d7b7' size={40} /> : 'SIGNUP'}</Button>
        <p style={{ marginTop: 10 }}>
          Already have an account?
          <Link to={'/signin'}> Sign In</Link>
        </p>
      </form>
    </Container>
  )
}

export default SignupPage;