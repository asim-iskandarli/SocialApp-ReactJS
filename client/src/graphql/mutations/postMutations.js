import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation Mutation($content: String!, $authorId: String!) {
        createPost(content: $content, authorId: $authorId) {
        id
        content
        createdAt
  }
}
`
export const DELETE_POST = gql`
  mutation Mutation($postId: String!) {
  deletePost(postId: $postId)
}
`

export const LIKE_POST = gql`
  mutation Mutation($postId: String!, $likedId: String!) {
  likePost(postId: $postId, likedId: $likedId)
}
`
export const UNLIKE_POST = gql`
  mutation Mutation($postId: String!, $unlikedId: String!) {
  unlikePost(postId: $postId, unlikedId: $unlikedId)
}
`