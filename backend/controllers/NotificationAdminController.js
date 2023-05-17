import express from "express";
import asyncHandler from "express-async-handler";
import notificationServiceAdmin from "../services/NotificationAdminService.js";
const notificationAdminControl = express.Router();

notificationAdminControl.post(
    "/create",
    asyncHandler(async (req,res)=>{
        try
        {
            const {action,dateNotification,person} = req.body;
            const createdNotif =  notificationServiceAdmin.createNotification(action,dateNotification,person);
            res.status(201).json(createdNotif);
        }
        catch(e)
        {
            res.status(404).json({
                message:e.message
            })
        }
    })
);

notificationAdminControl.get(
    "/",
    asyncHandler(async (req,res)=>{
        try{
            const notifs = await notificationServiceAdmin.getAllNotifAdmin();
            res.json(notifs);
        }catch(e)
        {
            res.status(404).json({
                message: e.message
            });
        }
    })
);
notificationAdminControl.delete(
    "/:id",
    asyncHandler(async (req,res)=>{
        const notif = await notificationServiceAdmin.getNotifAdminById(req.params.id);
        if (notif)
        {
            const deletedNotification = await notificationServiceAdmin.deleteNotification(req.params.id);
            res.json({deletedNotification,message :"Notification Deleted"});
        }
        else
        {
            res.status(404).json({message:"Notification Not Found"});
        }
       })
    
);
notificationAdminControl.delete(
    "/deleteall",
    asyncHandler(async (req,res)=>{
        await notificationServiceAdmin.deleteAllNotif();
    })
)

export default notificationAdminControl;