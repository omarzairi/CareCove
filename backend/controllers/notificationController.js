import express from "express";
import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.JS";

const notificationControl = express.Router();

notificationControl.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { action,dateNotification,person } = req.body;
    const notification = new Notification({
     action,
     dateNotification,
     person
    });
    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
  })
);

export default notificationControl;
