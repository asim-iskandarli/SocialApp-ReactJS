import messageSchema from "./mesasgeSchema.js";
import userSchema from "./userSchema.js";
import postSchema from "./postSchema.js";
import commentSchema from "./commentSchema.js";

const typeDefs = [userSchema, messageSchema, postSchema, commentSchema];
export default typeDefs;