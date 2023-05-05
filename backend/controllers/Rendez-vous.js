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
const RendezVousControl = express.Router();

RendezVousControl.post(
  "/addRendezVous",
  protectPatient,
  asyncHandler(async (req, res) => {
    const { heureRV, doctor } = req.body;
    const patient = req.patient._id;
    const dateRV = new Date(req.body.date);
    const createdRendezVous = await RendezVousService.createRendezVous({
      Patient: patient,
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
  "/RendezVous",
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

export default RendezVousControl;
