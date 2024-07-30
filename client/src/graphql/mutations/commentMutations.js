import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
    mutation Mutation($text: String!, $postId: String!) {
      createComment(text: $text, postId: $postId) {
        createdAt
        id
        text
      }
}
`