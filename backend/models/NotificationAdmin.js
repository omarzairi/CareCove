import mongoose from "mongoose";
const NotificationAdminSchema = new mongoose.Schema({
    action:{type:String,required:true},
    dateNotification:{
        type:Date,
        required:true
    },
    person:{type: mongoose.Schema.Types.ObjectId,
        ref:"Person",
        required:true
    },
});
const NotificationAdmin = mongoose.model("NotificationAdmin",NotificationAdminSchema);
export default NotificationAdmin;