import express from "express";
import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";
import notificationService from "../services/NotificationService.js";

const notificationControl = express.Router();

notificationControl.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { action, dateNotification, person } = req.body;
    const notification = new Notification({
      action,
      dateNotification,
      person,
    });
    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
  })
);

notificationControl.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const notification = await notificationService.getNotificationById(
        req.params.id
      );
      if (notification) {
        res.json(notification);
      } else {
        res.status(404).json({ message: "Notification Not Found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);
notificationControl.get(
  "/doctor/:id",
  asyncHandler(async (req, res) => {
    try {
      const notification = await notificationService.getNotificationByDoctorId(
        req.params.id
      );
      if (notification) {
        res.json(notification);
      } else {
        res.status(404).json({ message: "Notification Not Found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);
notificationControl.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const notifications = await notificationService.getAllNotifications();
      res.json(notifications);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

notificationControl.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const notification = await notificationService.getNotificationById(
        req.params.id
      );
      if (notification) {
        const updateData = req.body;
        const updatedNotification =
          await notificationService.updateNorification(
            req.params.id,
            updateData
          );
        res.json({ updatedNotification, message: "Notification Updated " });
      } else {
        res.status(404).json({ message: "Notification Not Found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

notificationControl.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const notification = await notificationService.getNotificationById(
      req.params.id
    );
    if (notification) {
      const deletedNotification = await notificationService.deleteNotification(
        req.params.id
      );
      res.json({ deletedNotification, message: "Notification Deleted" });
    } else {
      res.status(404).json({ message: "Notification Not Found" });
    }
  })
);
notificationControl.delete(
  "/deleteall",
  asyncHandler(async (req,res)=>{
      await notificationService.deleteAllNotif();
  })
)
export default notificationControl;
