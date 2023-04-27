import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
    {
        text:{type : String, required : true},
        rating:{type : Number , required : true},
        date:{type : Date,required : true}
    }
);
const Comment = mongoose.model("Comment",CommentSchema);
export default Comment;