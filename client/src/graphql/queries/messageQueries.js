import { gql } from "@apollo/client";


export const GET_MESSAGES = gql`
    query Query($receiverId: String!) {
    getMessages(receiverId: $receiverId) {
        id
        receiverId
        senderId
        text
        createdAt
    }

    getUser(id: $receiverId) {
        id
        username
        avatar
    }
}`