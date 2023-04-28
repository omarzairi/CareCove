import express from "express";
import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.JS";
import notificationService from "../services/NotificationService";

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
  }));

  notificationControl.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ message: "Notification Not Found" });
        }

    }
));

notificationControl.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification) {
            const updateData = req.body;
            const updatedNotification= await notificationService.updateNorification(req.params.id, updateData);
            res.json({updatedNotification, message: "Notification Updated "} );
        } else {
            res.status(404).json({ message: "Notification Not Found" });
        }
    }
)
);

notificationControl.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification) {
            const deletedNotification = await personService.dateNotification(req.params.id);
            res.json({deletedNotification, message: "Notification Deleted" });
        } else {
            res.status(404).json({ message: "Notification Not Found" });
        }


    }
)
);
export default notificationControl;
