import { gql } from "@apollo/client";


export const CREATE_MESSAGE = gql`
    mutation Mutation($receiverId: String!, $text: String!) {
      sendMessage(receiverId: $receiverId, text: $text) {
        createdAt
        id
        senderId
        text
      }
}
`