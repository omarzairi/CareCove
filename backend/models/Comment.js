import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
    {
        text:{type : String, required : true},
        rating:{type : Number , required : true},
        date:{type : Date,required : true},
        doctor:{type :mongoose.Schema.Types.ObjectId,required:true,ref:"Doctor"}
    }
);
const Comment = mongoose.model("Comment",CommentSchema);
export default Comment;