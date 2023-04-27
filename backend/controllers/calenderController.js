
import express from "express";
import asyncHandler from "express-async-handler";
import Calender from "../models/Calender.js";

const calenderControl = express.Router();

calenderControl.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { availability, hour, date } = req.body;
    
    const calender = new Calender({
        availability,
        hour,
        date,
     
    });
    const createdCalender = await calender.save();
    res.status(201).json(createdCalender);
  })
);

export default calenderControl;
