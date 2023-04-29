import Calender from "../models/Calender.js";
import res from "express/lib/response.js";

const calenderService = {
  async createCalender({ availability, hour, date, doctor }) {
    const calender = await Calender.create({
      availability,
      hour,
      date,
      doctor,
    });
    return await calender.save();
  },
  async getCalenderById(calenderId) {
    const calender = await Calender.findById(calenderId);
    if (!calender) {
      throw new Error("Calender not found");
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
      throw new Error("Calender not found");
    }
    calender.availability = updateData.availability || calender.availability;
    calender.hour = updateData.hour || calender.hour;
    calender.date = updateData.date || calender.date;
    calender.doctor = updateData.doctor || calender.doctor;

    const updatedCalender = await calender.save();
    return updatedCalender.toObject();
  },

  async deleteCalender(calenderId) {
    const calender = await Calender.findById(calenderId);
    if (!calender) {
      throw new Error("Calender not found");
    }
    await Calender.findByIdAndDelete(calenderId);
    return calender.toObject();
  },
};
export default calenderService;
