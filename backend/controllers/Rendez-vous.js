import express from "express";

import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import RendezVousService from "../services/Rendez-vous.js";
const RendezVousControl = express.Router();


RendezVousControl.post(
    "/addRendezVous",
    asyncHandler(async (req,res)=>{
        const {heureRV,patient,doctor,} = req.body;
        const dateRV = new Date(req.body.date);
        const RendezVous = new RendezVous({
            heureRV,
            patient,
            date,
            doctor,
            dateRV
        });
        const createdRendezVous = await RendezVousService.createComment(RendezVous.toObject());
        if(createdCRendezVous)
        {
            res.status(201).json(createdRendezVous);
        }
        else
        {
            res.status(401).json({msg : "something went wrong"});
        }
    })
);

RendezVousControl.get(
    "/RendezVous",
    asyncHandler( async (req,res)=>{
        try
        {
        const RVs = await RendezVousService.getAllRendezVous();
        if(RVs)
        {
            res.json(RVs);
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


RendezVousControl.delete(
    "/deleteRV/:id",
    asyncHandler( async (req,res)=>{
        try
        {
        const Rv = await RendezVousService.deleteRendezVous(req.params.id);
        if(Rv)
        {
            res.json({Rv, message : "Comment Deleted"});
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


export default RendezVousControl;