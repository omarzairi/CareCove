import express from "express";
import asyncHandler from "express-async-handler";
import PatientClass from "../entities/Patient.js";
import patientService from "../services/PatientService.js";
import Person from "../models/Person.js";

const patientControl = express.Router();

patientControl.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { person, allergies, bloodType, height, weight } = req.body;
    const perr = await Person.findById(person);
    const patient = new PatientClass(
      perr.firstName,
      perr.lastName,
      perr.birthDate,
      perr.gender,
      perr.role,
      perr.email,
      perr.password,
      allergies,
      bloodType,
      height,
      weight
    );
    console.log(patient);
    const createdPatient = await patientService.createPatient({
      person: perr._id,
      allergies: patient.allergies,
      bloodType: patient.bloodType,
      height: patient.height,
      weight: patient.weight,
    });
    if (createdPatient) {
      res.status(201).json({
        _id: createdPatient._id,
        person: createdPatient.person,
        allergies: createdPatient.allergies,
        bloodType: createdPatient.bloodType,
        height: createdPatient.height,
        weight: createdPatient.weight,
        msg: "Patient created successfully",
      });
    } else {
      throw new Error("Something Went Wrong Invalid User Data!");
    }
  })
);

patientControl.get(
  "/",
  asyncHandler(async (req, res) => {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  })
);

patientControl.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const patient = await patientService.getPatientById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient Not Found" });
    }
  })
);

patientControl.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const patient = await patientService.getPatientById(req.params.id);
    if (patient) {
      const updateData = req.body;
      const updatedPatient = await patientService.updatePatient(
        req.params.id,
        updateData
      );
      res.json({ updatedPatient, message: "Patient Updated" });
    } else {
      res.status(404).json({ message: "Patient Not Found" });
    }
  })
);

patientControl.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const patient = await patientService.getPatientById(req.params.id);
    if (patient) {
      const deletedPatient = await patientService.deletePatient(req.params.id);
      res.json({ deletedPatient, message: "Patient Deleted" });
    } else {
      res.status(404).json({ message: "Patient Not Found" });
    }
  })
);

export default patientControl;
