const postSchema = `#graphql
    type Query {
        getComments(postId: String!): [Comment]
    }

    type Mutation {
        createComment(text: String!, postId: String!): Comment
    }

    type Comment {
        id: ID!
        text: String!
        user: User!
        createdAt: Date
    }
    scalar Date
`;

export default postSchema;