import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
    query Query($postId: String!) {
        getComments(postId: $postId) {
            id
            text
            user {
                id
                username
                avatar
            }
            createdAt
        }
    }
`;