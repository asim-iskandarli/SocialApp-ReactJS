import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Query {
  getPosts {
    id
    content
    createdAt
    author {
      id
      username
      avatar
    }
    likes {
      id
      username
      avatar
    }
  }
}
`

export const GET_USER_POSTS = gql`
  query Query($authorId: String!) {
  getUserPosts(authorId: $authorId) {
    id
    content
    createdAt
    author {
      id
      username
      avatar
    }
    likes {
      id
      username
      avatar
    }
  }
}
`