import Comment from "../models/Comment.js"
const commentService = {
    async createComment({text,rating,date,person})
    {
        const comment = await Comment.create({
            text,
            rating,
            date,
            person,
        });
        return await comment.save();
    },
    async getAllComments()
    {
        const comments = await Comment.find();
        return comments.map((comment)=> comment.toObject());
    },
    async deleteComment(commentId) {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error('an Error has occured');
        }
        await Comment.findByIdAndDelete(commentId);
        return comment.toObject();
    },


};
export default commentService;