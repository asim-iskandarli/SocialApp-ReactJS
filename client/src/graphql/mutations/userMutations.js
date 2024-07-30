import { gql } from "@apollo/client";

export const USER_SIGNUP = gql`
    mutation Signup($input: SignupInput) {
    signup(input: $input) {
        token
        user {
        id
        fullname
        email
        avatar
    }
  }
}
`;
export const USER_SIGNIN = gql`
    mutation Signin($input: SigninInput) {
        signin(input: $input) {
            token
            user {
                id
                username
                fullname
                email
                avatar
        }
  }
}
`;
export const UPDATE_USER = gql`
    mutation Mutation($fullname: String, $username: String, $email: String) {
  updateUser(fullname: $fullname, username: $username, email: $email) {
    id
    username
    email
    fullname
    avatar
    createdAt
    posts {
      id
      likes {
        id
        avatar
        username
      }
      createdAt
      content
      author {
        id
        avatar
        username
      }
    }
  }
}
`;