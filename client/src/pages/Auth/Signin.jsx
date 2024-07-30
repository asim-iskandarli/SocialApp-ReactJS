import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, InputFiled } from './styled';
import { Button } from '../../globalStyles';
import { useMutation } from '@apollo/client';
import { USER_SIGNIN } from '../../graphql/mutations/userMutations';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import { PuffLoader } from 'react-spinners';

const SigninPage = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signin, { loading }] = useMutation(USER_SIGNIN, {
    onCompleted: (data) => {
      dispatch(getUser(data.signin.user));
      localStorage.setItem('userToken', data.signin.token);
      navigate('/');
    },
    onError: (error) => {
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
    if (!userData.username || !userData.password) {
      return setError('Fields cannot be left blank')
    }
    signin({
      variables: {
        input: userData
      }
    })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <span style={{ color: '#f05959' }}>{error}</span>
        <InputFiled>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' name='username' placeholder='Enter Username' onChange={handleChangeInput} />
        </InputFiled>
        <InputFiled>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' placeholder='Enter Password' onChange={handleChangeInput} />
        </InputFiled>

        <Button disabled={loading} type='submit'> {loading ? <PuffLoader color='#36d7b7' size={40} /> : 'SIGNIN'}</Button>
        <Link to={'/forgot'}> Forgot password?</Link>
        <p>Don't have an account?<Link to={'/signup'}> Sign Up</Link></p>
      </form>
    </Container>
  )
}

export default SigninPage;