import prisma from '../../config/database.js';

const postResolver = {
    Query: {
        getComments: async (_, {postId}, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            const comments = await prisma.comment.findMany({
                where: {
                    postId
                }
                ,
                include: {
                    user: true,
                },
            });
            console.log(comments)
            return comments;
        },
    },
    Mutation: {
        createComment: async (_, { text, postId }, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            const newComment = await prisma.comment.create({
                data: {
                    text,
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    post: {
                        connect: {
                            id: postId
                        }
                    }
                }
            });
            return newComment;
        },
    }
}

export default postResolver;