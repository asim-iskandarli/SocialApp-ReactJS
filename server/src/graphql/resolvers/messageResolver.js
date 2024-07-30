import prisma from '../../config/database.js';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
const MESSAGE_CREATED = 'MESSAGE_CREATED'

const messageResolver = {
    Query: {
        getMessages: async (_, {receiverId}, {userId}) => {
            if(!userId)  throw new Error('You must be logged in.');
            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        {senderId: userId, receiverId: receiverId},
                        {receiverId: userId, senderId: receiverId}
                    ]
                }
            })
      
            return messages;
        }
    },
    Mutation: {
        sendMessage: async (_, { receiverId, text }, {userId}) => {
            if(!userId)  throw new Error('You must be logged in.');
            const newMessage = await prisma.message.create({
                data: {
                    text,
                    receiverId,
                    senderId: userId
                }
            })
            pubsub.publish(MESSAGE_CREATED, {message: newMessage})
            return newMessage;
        },
    },
    Subscription: {
        message: {
            subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED)
        }
    }
}

export default messageResolver;