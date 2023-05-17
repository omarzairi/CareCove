import NotificationAdmin from "../models/NotificationAdmin.js";

const notificationServiceAdmin = {
  async createNotification({ action, dateNotification, person }) {
    const notif = await NotificationAdmin.create({
      action,
      dateNotification,
      person,
    });
    return await notif.save();
  },
  async getNotifAdminById(notifId) {
    const notif = await NotificationAdmin.findById(notifId).populate("person");
    if (!notif) {
      throw new Error("Notification Not Found");
    }
    return notif;
  },
  async getAllNotifAdmin() {
    const notifs = await NotificationAdmin.find();
    return notifs.map((notif) => notif.toObject());
  },
  async deleteNotification(notifId) {
    const notif = await NotificationAdmin.findById(notifId);
    if (!notif) {
      throw new Error("Notification Not Found");
    }
    await NotificationAdmin.findByIdAndDelete(notifId);
  },
  async deleteAllNotif() {
    await NotificationAdmin.deleteMany({});
  },
};
export default notificationServiceAdmin;
