import { gql } from "@apollo/client";

export const REFRESH_USER = gql`
    query RefreshUser($token: String!) {
    refreshUser(token: $token) {
        id
        username
        fullname
        email
        avatar
        createdAt
        posts {
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
}
`

export const GET_USER = gql`
    query Get_User($id: String!) {
    getUser(id: $id) {
        id
        username
        fullname
        avatar
        createdAt
        posts {
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
}
`

export const GET_ALL_USERS = gql`
  query Query {
  users {
    id
    username
    fullname
    avatar
  }
}
`



export const SEARCH_USER = gql`
    query Search_user($name: String!) {
    searchUser(name: $name) {
        id
        username
        fullname
        avatar
  }
}
`