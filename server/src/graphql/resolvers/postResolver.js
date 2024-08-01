import prisma from '../../config/database.js';

const postResolver = {
    Query: {
        getPosts: async (_, __, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            const posts = await prisma.post.findMany({
                include: {
                    author: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return posts;
        },
        getUserPosts: async (_, { authorId }, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            const posts = await prisma.post.findMany({
                where: {
                    authorId
                },
                include: {
                    author: true,
                    likes: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return posts;
        }
    },
    Mutation: {
        createPost: async (_, { content, authorId }, { userId }) => {
            if (!userId) throw new Error('You must be logged in');
            if (!content) throw new Eror('Content cannot be left empty')
            const newPost = await prisma.post.create({
                data: {
                    content,
                    author: {
                        connect: {
                            id: authorId
                        }
                    }
                }
            });
            return newPost;
        },
        deletePost: async (_, { postId }, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            if (!postId) return;
            await prisma.post.delete({
                where: {
                    id: postId
                }
            })

            return 'Deleted post'
        },
        likePost: async (_, { postId, likedId }, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            if (likedId !== userId) throw new Error('Error authentication');

            const likedPost = await prisma.post.findMany({
                where: {
                    id: postId,
                    likedByIDs: {
                        hasEvery: [likedId]
                    }
                }
            });

            if (likedPost.length > 0) {
                throw new Error('already liked this post')
            }


            await prisma.post.update({
                where: { id: postId },
                data: {
                    likedByIDs: {
                        push: userId
                    }
                }
            })
            return 'Liked post';
        },
        unlikePost: async (_, { postId, unlikedId }, { userId }) => {
            if (!userId) throw new Error('You must be logged in.');
            if (unlikedId !== userId) throw new Error('Error authentication');


            const existingPost = await prisma.post.findUnique({
                where: {
                    id: postId,
                },
            });

            if (!existingPost) {
                throw new Error("Invalid Post ID");
            }

            const updatedlikedByIDs = existingPost.likedByIDs.filter((id) => id !== userId);

            await prisma.post.update({
                where: { id: postId },
                data: {
                    likedByIDs: updatedlikedByIDs
                }
            })
            return 'Unliked post';
        }
    }
}

export default postResolver;