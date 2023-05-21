import express from "express";
import asyncHandler from "express-async-handler";
import consultationService from "../services/ConsultationService.js";
import protectDoctor from "../middleware/doctorAuth.js";
import doctorService from "../services/DoctorService.js";
import patientService from "../services/PatientService.js";
import Consultation from "../models/Consultation.js";

const consultationControl = express.Router();

consultationControl.post(
  "/add",
  protectDoctor,
  asyncHandler(async (req, res) => {
    const { patientId, marks, medicine, date } = req.body;
    const doctorId = req.doctor._id;

    const doctor = await doctorService.getDoctorById(doctorId);
    const patient = await patientService.getPatientById(patientId);

    if (patient.amount >= doctor.price) {
      const createdConsultation = await consultationService.createConsultation({
        doctorId,
        patientId,
        marks,
        medicine,
        date,
      });
      if (createdConsultation) {
        patient.amount = patient.amount - doctor.price;
        await patient.save();
      }
      res.status(201).json(createdConsultation);
    } else {
      res
        .status(400)
        .json({ message: "Payment Failed! Please Contact Patient" });
    }
  })
);

consultationControl.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const consultation = await consultationService.getConsultationById(
        req.params.id
      );
      if (consultation) {
        res.json(consultation);
      } else {
        res.status(404).json({ message: "Consultation not found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

consultationControl.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const consultations = await consultationService.getAllConsultations();
      res.json(consultations);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

consultationControl.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const updateData = req.body;
      const updatedConsultation = await consultationService.updateConsultation(
        req.params.id,
        updateData
      );
      res.json({
        updatedConsultation,
        message: "Consultation updated successfully",
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

consultationControl.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const deletedConsultation = await consultationService.deleteConsultation(
        req.params.id
      );
      res.json({ deletedConsultation, message: "Consultation deleted" });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

//get all consulations by doctor and populate

consultationControl.get(
  "/doctor/getMyCons",
  protectDoctor,
  asyncHandler(async (req, res) => {
    try {
      const doctorId = req.doctor._id;
      const consultations = await Consultation.find({
        doctorId: doctorId,
      })
        .sort({
          date: -1,
        })
        .populate({
          path: "patientId",
          select: "-password",
          populate: {
            path: "person",
            model: "Person",
            select: "-password",
          },
        });
      res.json(consultations);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

export default consultationControl;
