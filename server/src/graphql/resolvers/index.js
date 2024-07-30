import userResolver from './userResolver.js';
import messageResolver from './messageResolver.js';
import postResolver from './postResolver.js';
import commentResolver from './commentResolver.js';

const resolvers = [userResolver, messageResolver, postResolver];

export default resolvers;