import React, { useEffect, useRef, useState } from 'react'
import { Container, MessagesScreen, Messages, Header, Body, Footer, RightButtons, NoMessageBox, LoadConversation } from './styled'
import SideBar from '../../components/Messages/SideBar';
import { useParams, Link } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Icon } from '../../globalStyles';
import MessageCard from '../../components/Messages/MessageCard'
import { useLazyQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries/messageQueries';
import { PuffLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation } from '../../redux/slices/messageSlice';
import SendMessage from '../../components/Messages/SendMessage';

const ConversationPage = () => {
  const { id } = useParams();
 
  const { conversations } = useSelector(state => state.messageReducer);
  const dispatch = useDispatch();

  const [conversation, setConversation] = useState({
    user: null,
    messages: []
  })
  const scrollTo = useRef(null);

  const [getMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
    onCompleted: (data) => {
      console.log(data);
      const newData = { user: data.getUser, messages: data.getMessages }
      console.log(newData)
      setConversation(newData);
      dispatch(getConversation(newData));
    },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    if (id) {
      if (conversations.every(item => item?.user?.id !== id)) {
        getMessages({
          variables: {
            receiverId: id
          },
          fetchPolicy: "no-cache",
        })
      } else {
        conversations.forEach(data => {
          if (data.user.id === id) {
            setConversation(data)
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, conversations])

  useEffect(() => {
    if (conversation?.messages?.length) {
      scrollTo.current.scrollTop = scrollTo.current.scrollHeight;
    }
  }, [conversation?.messages.length])


  return (
    <Container>
      <SideBar />
      {
        loading ?
          <LoadConversation>
            <PuffLoader color='#36d7b7' size={50} />
          </LoadConversation> :
          <MessagesScreen>
            <Header>
              <Link to={`/profile/${conversation?.user?.id}`}><UserCard user={conversation?.user} /></Link>
              <RightButtons>
                <Icon>
                  <BiDotsHorizontalRounded size={22} />
                </Icon>
              </RightButtons>
            </Header>
            <Body>
              <Messages ref={scrollTo}>
                {
                  conversation.messages.length > 0 ?
                  conversation.messages.map(msg => (
                      <MessageCard key={msg.id} message={msg} type={msg.receiverId === id ? 'me' : 'other'} />
                    ))
                    :
                    <NoMessageBox>
                      <h2 style={{opacity: 0.8}}>No messages yet.</h2>
                    </NoMessageBox>
                }
              </Messages>
            </Body>
            <Footer>
              <SendMessage id={id}/>
            </Footer>
          </MessagesScreen>
      }
    </Container>
  )
}

export default ConversationPage