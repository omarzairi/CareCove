import express from "express";

import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import RendezVousService from "../services/Rendez-vous.js";
import Notification from "../models/Notification.js";
import notificationService from "../services/NotificationService.js";
import protectPatient from "../middleware/patientAuth.js";
import Patient from "../models/Patient.js";
import patientService from "../services/PatientService.js";
import doctorService from "../services/DoctorService.js";
import protectDoctor from "../middleware/doctorAuth.js";
import RendezVous from "../models/Rendez-vous.js";
const RendezVousControl = express.Router();

RendezVousControl.post(
  "/addRendezVous",
  
  asyncHandler(async (req, res) => {
    const { heureRV, doctor, Patient} = req.body;
    const dateRV = new Date(req.body.dateRV);
    const createdRendezVous = await RendezVousService.createRendezVous({
      Patient: Patient,
      doctor,
      dateRV,
      heureRV,
    });
    if (createdRendezVous) {
      const patInfo = await patientService.getPatientById(
        createdRendezVous.Patient.toString()
      );
      const DocInfo = await doctorService.getDoctorById(
        createdRendezVous.doctor.toString()
      );
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const notification = await notificationService.createNotification({
        action: `${patInfo.person.firstName} ${
          patInfo.person.lastName
        } has booked an appointment with you for the ${createdRendezVous.dateRV.toLocaleDateString(
          "en-US",
          options
        )} at ${createdRendezVous.heureRV}`,
        dateNotification: new Date(),
        person: DocInfo.person._id,
      });

      if (notification) {
        res.status(201).json({
          notification,
          createdRendezVous,
          message: "Appointment Booked Successfully !",
        });
      } else {
        res.status(401).json({ msg: "something went wrong" });
      }
    }
  })
);

RendezVousControl.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const RVs = await RendezVousService.getAllRendezVous();
      if (RVs) {
        res.json(RVs);
      } else {
        res.status(404).json({ message: "no comments" });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
);

RendezVousControl.delete(
  "/deleteRV/:id",
  asyncHandler(async (req, res) => {
    try {
      const Rv = await RendezVousService.deleteRendezVous(req.params.id);
      if (Rv) {
        res.json({ Rv, message: "Comment Deleted" });
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
);
RendezVousControl.get(
  "/doctor/getMyRVThisMonth",
  protectDoctor,
  asyncHandler(async (req, res) => {
    try {
      //get my upcoming appointments during this month only
      const rv = await RendezVous.find({
        doctor: req.doctor._id,
        dateRV: {
          $gte: new Date(),
          $lt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        },
      });
      if (rv) {
        res.json(rv);
      } else {
        res.status(404).json({
          message: "no appointments",
        });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
);
RendezVousControl.get(
  "/doctor/getMyRVToday",
  protectDoctor,
  asyncHandler(async (req, res) => {
    try {
      //get my upcoming appointments today
      const rv = await RendezVous.find({
        doctor: req.doctor._id,
        dateRV: {
          $gte: new Date(),
          $lt: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
      });
      if (rv) {
        res.json(rv);
      } else {
        res.status(404).json({
          message: "no appointments",
        });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
);
RendezVousControl.get(
  "/doctor/getAllMyRV",
  protectDoctor,
  asyncHandler(async (req, res) => {
    try {
      const rv = await RendezVous.find({
        doctor: req.doctor._id,
        dateRV: {
          $gte: new Date(),
        },
      })
        .sort({ dateRV: 1 })
        .populate({
          path: "Patient",

          populate: {
            path: "person",
            model: "Person",
            select: "-password",
          },
        });

      if (rv) {
        res.json(rv);
      } else {
        res.status(404).json({
          message: "no appointments",
        });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  })
);

export default RendezVousControl;
