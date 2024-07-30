import React from 'react'
import { MessageBox, MessageText } from '../../pages/Messages/styled';
import moment from 'moment';

const MessageCard = ({ type, message }) => {
    return (
        <MessageBox className={type}>
            <MessageText>
                <strong>{message.text}</strong>
            <p>{moment(message.createdAt).fromNow()}</p>
            </MessageText>
        </MessageBox>
    )
}

export default MessageCard