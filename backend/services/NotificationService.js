import asyncHandler from "express-async-handler";
import express from "express";
import bcrypt from "bcryptjs";
import res from "express/lib/response.js";
import Notification from "../models/Notification.js";
const notificationService = {
  async createNotification({ action, dateNotification, person }) {
    const notification = await Notification.create({
      action,
      dateNotification,
      person,
    });
    return await notification.save();
  },
  async getNotificationById(notificationId) {
    const notification = await Notification.findById(notificationId).populate(
      "person"
    );
    if (!notification) {
      throw new Error("Notification not found");
    }
    return notification;
  },
  async getNotificationByDoctorId(doctorId) {
    const notification = await Notification.find({ person: doctorId }).sort({
      dateNotification: -1,
    });
    if (!notification) {
      throw new Error("Notification not found");
    }
    return notification;
  },
  async getAllNotifications() {
    const notifications = await Notification.find();
    return notifications.map((notification) => notification.toObject());
  },

  async updateNorification(notificationId, updateData) {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    notification.action = updateData.action || notification.action;
    notification.dateNotification =
      updateData.dateNotification || notification.dateNotification;
    notification.person = updateData.person || notification.person;

    const updatedNotification = await notification.save();
    return updatedNotification.toObject();
  },

  async deleteNotification(notificationId) {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    await Notification.findByIdAndDelete(notificationId);
    return notification.toObject();
  },
  async deleteAllNotif() {
    await Notification.deleteMany({});
  },
};

export default notificationService;
