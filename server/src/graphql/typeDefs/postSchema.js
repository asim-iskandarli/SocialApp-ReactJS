const postSchema = `#graphql
    type Query {
        getPosts: [Post]
        getUserPosts(authorId: String): [Post]
    }

    type Mutation {
        createPost(content: String!, authorId: String!): Post
        updatePost(postId: String, content: String!, authorId: String!): String
        deletePost(postId: String!): String
        likePost(postId: String!, likedId: String!): String
        unlikePost(postId: String!, unlikedId: String!): String
    }

    type Post {
        id: ID!
        content: String!
        author: User!
        likes: [User]
        createdAt: Date
    }
    scalar Date
`;

export default postSchema;