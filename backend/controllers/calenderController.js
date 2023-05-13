import express from "express";
import asyncHandler from "express-async-handler";
import Calender from "../models/Calender.js";
import calenderService from "../services/CalenderService.js";
import protectDoctor from "../middleware/doctorAuth.js";

const calenderControl = express.Router();

calenderControl.post(
  "/addCalender",
  asyncHandler(async (req, res) => {
    const { date, doctor } = req.body;
    try {
      const createdCalender = await calenderService.createCalender({
        date,
        doctor,
      });

      if (createdCalender) {
        res.status(201).json({
          _id: createdCalender._id,
          availability: createdCalender.availability,
          date: createdCalender.date,
          doctor: createdCalender.doctor,
          msg: "Calender Created Successfully!",
        });
      } else {
        res
          .status(401)
          .json({ msg: "Something Went Wrong Invalid Calender Data!" });
      }
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  })
);

calenderControl.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const calender = await calenderService.getCalenderById(req.params.id);
    if (calender) {
      res.json(calender);
    } else {
      res.status(404).json({ message: "Calender Not Found" });
    }
  })
);

calenderControl.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const calender = await calenderService.getCalenderById(req.params.id);
    if (calender) {
      const updateData = req.body;
      const updatedCalender = await calenderService.updateCalender(
        req.params.id,
        updateData
      );
      res.json({ updatedCalender, message: "Calender Updated " });
    } else {
      res.status(404).json({ message: "Calender Not Found" });
    }
  })
);

calenderControl.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const calender = await calenderService.getCalenderById(req.params.id);
    if (calender) {
      const deletedCalender = await calenderService.deletedCalender(
        req.params.id
      );
      res.json({ deletedCalender, message: "Calender Deleted" });
    } else {
      res.status(404).json({ message: "Calender Not Found" });
    }
  })
);

calenderControl.get(
  "/getByDoctorid/:id",
  asyncHandler(async (req, res) => {
    const calenders = await calenderService.getCalenderByDoctorId(
      req.params.id
    );
    if (calenders) {
      res.json(calenders);
    } else {
      res.status(404).json({ message: "Calender Not Found" });
    }
  })
);

calenderControl.post(
  "/getAvailability",
  protectDoctor,
  asyncHandler(async (req, res) => {
    const calenders = await Calender.find({
      doctor: req.doctor._id,
      date: {
        $gte: new Date(req.body.date),
        $lt: new Date(
          new Date(req.body.date).setDate(new Date(req.body.date).getDate() + 1)
        ),
      },
    });
    if (calenders.length > 0) {
      res.json(calenders);
    } else {
      res.status(404).json({ message: "Calender Not Found" });
    }
  })
);

calenderControl.post(
  "/updateAvailability",
  protectDoctor,
  asyncHandler(async (req, res) => {
    const calenders = await Calender.findOneAndUpdate(
      {
        doctor: req.doctor._id,
        date: new Date(req.body.date),
        "availability.time": req.body.time,
      },
      {
        $set: {
          "availability.$.isAvailable": req.body.isAvailable,
        },
      }
    );
    if (calenders) {
      res.json(calenders);
    } else {
      res.status(404).json({ message: "Calender Not Found" });
    }
  })
);

export default calenderControl;
