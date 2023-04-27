import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  action: { type: String, required: true } ,
  dateNotification: {
    type: Date,
    required: true,
  },
  person : { type: mongoose.Schema.Types.ObjectId,
  ref: "Person",
  required: true}
});
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;