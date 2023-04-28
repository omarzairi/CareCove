import Calender from "../models/Calender.js";
import res from "express/lib/response.js";

const calenderService = {
    async createCalender({availability, hour, date}) {
         const calender = await Calender.create({
            availability,
            hour,
            date,
             
         });
         return await calender.save();
     },
     async getCalenderById(calenderId) {
         const calender = await Calender.findById(calenderId).select("-password");
         if (!calender) {
             res.status(404).json({ message: "Calender Not Found" });
         }
         return calender;
     },
     async getAllCalenders() {
         const calenders = await Calender.find();
         return calenders.map((calender) => calender.toObject());
     },
 
     async updateCalender(calenderId, updateData) {
         const calender = await Calender.findById(calenderId);
         if (!calender) {
             throw new Error('Calender not found');
         }
         calender.availability = updateData.availability || calender.availability;
         calender.hour = updateData.hour || calender.hour;
         calender.date = updateData.date || calender.date;
         const updatedCalender = await calender.save();
         return updatedCalender.toObject();
 
     },
 
     async deleteCalender(calenderId) {
         const calender = await Calender.findById(calenderId);
         if (!calender) {
             throw new Error('Calender not found');
         }
         await Calender.findByIdAndDelete(calenderId);
         return calender.toObject();
     },
 
 };
 export default calenderService;