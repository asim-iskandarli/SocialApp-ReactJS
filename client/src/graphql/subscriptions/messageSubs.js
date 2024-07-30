import { gql } from "@apollo/client";

export const CREATE_MESSAGE_SUB = gql`
    subscription Subscription {
      message {
        id
        text
        receiverId
        senderId
        createdAt
  }
}
`