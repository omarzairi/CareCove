import express from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import commentService from "../services/CommentService.js";

const commentControl = express.Router();

commentControl.post(
    "/addcomment",
    asyncHandler(async (req,res)=>{
        const {text,rating,patient,doctor,} = req.body;
        const date = new Date(req.body.date);
        const comment = new Comment({
            text,
            rating,
            date,
            doctor,
            patient
        });
        const createdComment = await commentService.createComment(comment.toObject());
        if(createdComment)
        {
            res.status(201).json(createdComment);
        }
        else
        {
            res.status(401).json({msg : "something went wrong"});
        }
    })
);

commentControl.get(
    "/getByDoctorid/:id",
    asyncHandler(async (req, res) => {
      const comments = await commentService.getCommentsByDoctorId(
        req.params.id
      );
      if (comments) {
        res.json(comments);
      } else {
        res.status(404).json({ message: "Comment Not Found" });
      }
    })
  );

commentControl.get(
    "/comments",
    asyncHandler( async (req,res)=>{
        try
        {
        const comments = await commentService.getAllComments();
        if(comments)
        {
            res.json(comments);
        }
        else
        {
            res.status(404).json({message : "no comments"});
        }
        }
        catch(err)
        {
            res.status(404).json({message:err.message});
        }   
    })
)

commentControl.delete(
    "/deletecomment/:id",
    asyncHandler( async (req,res)=>{
        try
        {
        const comment = await commentService.deleteComment(req.params.id);
        if(comment)
        {
            res.json({comment, message : "Comment Deleted"});
        }
        else
        {
            res.status(404).json({message : "Not Found"});
        }
        }
        catch(err)
        {
            res.status(404).json({message:err.message});
        }   
    })
);

export default commentControl;