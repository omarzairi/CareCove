import express from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/Comment";

const commentControl = express.Router();

commentControl.post(
    "/testing",
    asyncHandler(async (req,res)=>{
        const {text,rating} = req.body;
        const date = new Date(req.body.date);
        const comment = new Comment({
            text,
            rating,
            date,
            doctor
        });
        const createdComment = await comment.save();
        res.status(201).json(createdComment);
    })
);

export default commentControl;