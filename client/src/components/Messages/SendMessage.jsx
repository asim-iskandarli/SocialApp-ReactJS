import React, { useState } from 'react'
import { Button } from '../../globalStyles'
import { BiLoaderCircle } from 'react-icons/bi'
import { CREATE_MESSAGE } from '../../graphql/mutations/messageMutations';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { FiSend } from "react-icons/fi";

const SendMessage = ({id}) => {
    const [messageText, setMessageText] = useState("");

    const [createMessage, createMessageData] = useMutation(CREATE_MESSAGE, {
        onError: (error) => {
          console.log(error)
        }
      });

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        createMessage({
          variables: {
            receiverId: id,
            text: messageText
          }
        })
        setMessageText("")
      }

    return (
        <form onSubmit={handleSubmitMessage}>
            <input type="text" placeholder="Enter message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
            <SendBtn>{createMessageData.loading ? <BiLoaderCircle size={20} /> : <FiSend fontSize={18} /> } </SendBtn>
        </form>
    )
}

const SendBtn = styled(Button)`
  width: 60px !important;
`;

export default SendMessage