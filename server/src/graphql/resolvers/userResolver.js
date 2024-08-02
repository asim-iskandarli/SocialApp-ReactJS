import prisma from '../../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql'

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const userResolver = {
    Query: {
        users: async (_, __, { userId }) => {
            if (!userId) throw new GraphQLError('You must be logged in');

            const users = await prisma.user.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                where: {
                    id: {
                        not: userId
                    }
                }
            });
            return users;
        },
        refreshUser: async (_, { token }) => {
            if (!token) return null;
            const { id } = jwt.verify(token, process.env.JWT_SECRET);

            if (!id) return null;
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    posts: {
                        include: {
                            author: true,
                            likes: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                }
            })
            if (!user) return null;

            return user;
        },
        searchUser: async (_, { name }) => {
            if (!name) return null;

            const users = await prisma.user.findMany({
                where: {
                    username: {
                        startsWith: name
                    }
                },
                include: {
                    posts: {
                        include: {
                            author: true,
                            likes: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            })
            if (!users) return null;
            console.log(users)
            return users;
        },
        getUser: async (_, { id }) => {
            if (!id) return null;
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    posts: {
                        include: {
                            author: true,
                            likes: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            })
            if (!user) return null;

            return user;
        }
    },
    Mutation: {
        signup: async (_, { input }) => {
            const { username, fullname, email, password, avatar } = input;
            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            });
            if (user) throw new GraphQLError('User already exists with username', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            });
            // const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    fullname,
                    // password: passwordHash,
                    password,
                    avatar
                }
            });

            const token = createToken({ id: newUser.id });

            return {
                user: { ...newUser, password: null },
                token
            }
        },
        signin: async (_, { input }) => {
            const { username, password } = input;
            if (!username || !password) throw new GraphQLError('Fields cannot be left blank.', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            });
            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            });
            if (!user) throw new GraphQLError('Invalid credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            });
            // const passwordMath = await bcrypt.compare(password, user.password);
            // if (!passwordMath) throw new GraphQLError('Invalid credentials', {
            //     extensions: {
            //         code: 'BAD_USER_INPUT',
            //     }
            // });
            if (password !== user.password) throw new GraphQLError('Invalid credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            });
            const token = createToken({ id: user.id });
            return { user: { ...user, password: null }, token };
        },
        updateUser: async (_, { username, fullname, email }, { userId }) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user) throw new GraphQLError('User not found', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            });

            const newUsername = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            if (newUsername) throw new GraphQLError('User already exists', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            });

            const updateUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    username,
                    fullname,
                    email
                },
                include: {
                    posts: {
                        include: {
                            author: true,
                            likes: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            })
            return updateUser
        }
    }
}

export default userResolver;