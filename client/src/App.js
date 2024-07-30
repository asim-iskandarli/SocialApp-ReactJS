import GlobalStyle from './globalStyles';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignupPage from './pages/Auth';
import SigninPage from './pages/Auth/Signin';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import MessagesPage from './pages/Messages';
import ConversationPage from './pages/Messages/Conversation';
import ProfilePage from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { REFRESH_USER } from './graphql/queries/userQueries';
import { getUser, authLoading } from './redux/slices/userSlice';
import Navbar from './components/Navbar';
import PageLoad from './components/PageLoad';
import OfflineModal from './components/OfflineModal';
import { GET_POSTS } from './graphql/queries/postQueries';
import { getPosts, postsLoad } from './redux/slices/postSlice';
import { CREATE_MESSAGE_SUB } from './graphql/subscriptions/messageSubs';
import { updateConversation } from './redux/slices/messageSlice';

function App() {
  const { user, loading } = useSelector(state => state.userReducer);
  const [offline, setOffline] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userRefresh] = useLazyQuery(REFRESH_USER, {
    onCompleted: (data) => {
      dispatch(getUser(data.refreshUser))
      dispatch(authLoading(false));
    },
    onError: () => {
      navigate('/signin');
      dispatch(authLoading(false));
    }
  });

  useQuery(GET_POSTS, {
    onCompleted: (data) => {
      dispatch(getPosts(data.getPosts))
      dispatch(postsLoad(false))
    },
    onError: (error) => {
      console.log(error);
      dispatch(postsLoad(false))
    }
  })

  useSubscription(CREATE_MESSAGE_SUB, {
    onData({ data }) {
      const message = data.data.message;
      dispatch(updateConversation(message));
    }
  });


  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      userRefresh({
        variables: {
          token
        }
      })
    } else {
      navigate('/signin');
      dispatch(authLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOffline(true);
    });
    window.addEventListener("online", () => {
      setOffline(false);
    });
    return () => {
      window.removeEventListener("offline");
      window.removeEventListener("online");
    }
  }, [])

  if (loading) {
    return <PageLoad />
  }

  const loggedin = () => {
    if (!loading) {
      if (user) {
        return true;
      } else {
        return false;
      }
    }
  }
  return (
    <>
      <GlobalStyle />
      {user && <Navbar />}
      {offline && <OfflineModal />}
      <Routes>
        <Route path='/' element={loggedin() ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path='/signup' element={loggedin() ? <Navigate to="/" /> : <SignupPage />} />
        <Route path='/signin' element={loggedin() ? <Navigate to="/" /> : <SigninPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='/messages/:id' element={<ConversationPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
