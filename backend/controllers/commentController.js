import express from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/Comment";
import commentService from "../services/CommentService";

const commentControl = express.Router();

commentControl.post(
    "/testing",
    asyncHandler(async (req,res)=>{
        const {text,rating,patient} = req.body;
        const date = new Date(req.body.date);
        const comment = new Comment({
            text,
            rating,
            date,
            patient
        });
        const createdComment = await comment.save();
        res.status(201).json(createdComment);
    })
);

commentControl.get(
    "/comments",
    asyncHandler( async (req,res)=>{
        const comments = await commentService.getAllComments();
        if(comments)
        {
            res.json(comments);
        }
        else
        {
            res.status(404).json({message : "no comments"});
        }
    })
)

commentControl.delete(
    "/deletecomment/:id",
    asyncHandler( async (req,res)=>{
        const comment = await commentService.deleteComment(req.params.id);
        if( comment)
        {
            const deletedComment = await commentService.deleteComment(req.params.id);
            res.json({deletedComment, message : "Comment Deleted"});
        }
        else
        {
            res.status(404).json({message : "Not Found"});
        }
    })
);

export default commentControl;