

const messageSchema = `#graphql
    type Query {
        getMessages(receiverId: String!): [Message]
    }
    type Mutation {
        sendMessage(receiverId: String!, text: String!): Message
    }
    type Subscription {
        message: Message
    }
    type Message {
        id: ID!
        text: String
        receiverId: String!
        receiver: User!
        senderId: String!
        createdAt: Date
    }
    scalar Date
`;

export default messageSchema;