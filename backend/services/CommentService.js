import Comment from "../models/Comment.js"
const commentService = {
    async createComment({text,rating,date,doctor,patient})
    {
        const comment = await Comment.create({
            text,
            rating,
            date,
            doctor,
            patient,
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