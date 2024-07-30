const userSchema = `#graphql
    type Query {
        users: [User]
        getUser(id: String!): User
        refreshUser(token: String!): User
        searchUser(name: String!): [User]
    }

    type Mutation {
        signup(input: SignupInput): Auth
        signin(input: SigninInput): Auth
        updateUser(username: String, fullname: String, email: String): User
    }

    type User {
        id: ID!
        username: String!
        fullname: String
        email: String!
        avatar: String!
        posts: [Post]
        createdAt: Date
    }

    type Auth {
        user: User
        token: String
    }

    input SignupInput {
        fullname: String
        username: String!
        email: String!
        password: String!
        avatar: String!
    }
    input SigninInput {
        username: String!
        password: String!
    }

    scalar Date
`;

export default userSchema;