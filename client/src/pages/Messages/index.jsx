import React from 'react'
import { Container, StartConversation } from './styled'
import SideBar from '../../components/Messages/SideBar';

const MessagesPage = () => {
  return (
    <Container>
      <SideBar />
      <StartConversation>
        <h1 style={{opacity: 0.7}}>
          Start a new conversation
        </h1>
      </StartConversation>
    </Container>
  )
}

export default MessagesPage