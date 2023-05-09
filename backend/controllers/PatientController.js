import express from "express";
import asyncHandler from "express-async-handler";
import PatientClass from "../entities/Patient.js";
import patientService from "../services/PatientService.js";
import Person from "../models/Person.js";
import personService from "../services/PersonService.js";
import generateToken from "../utils/generateToken.js";
import Patient from "../models/Patient.js";

const patientControl = express.Router();

patientControl.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { person, allergies, bloodType, height, weight, amount } = req.body;
    const perr = await Person.findById(person);
    const patient = new PatientClass(
      perr.firstName,
      perr.lastName,
      perr.birthDate,
      perr.image,
      perr.gender,
      perr.role,
      perr.email,
      perr.password,
      allergies,
      bloodType,
      height,
      weight,
      amount
    );
    console.log(patient);
    const createdPatient = await patientService.createPatient({
      person: perr._id,
      allergies: patient.allergies,
      bloodType: patient.bloodType,
      height: patient.height,
      weight: patient.weight,
      amount: patient.amount,
    });
    if (createdPatient) {
      res.status(201).json({
        _id: createdPatient._id,
        person: createdPatient.person,
        allergies: createdPatient.allergies,
        bloodType: createdPatient.bloodType,
        height: createdPatient.height,
        weight: createdPatient.weight,
        amount: createdPatient.amount,
        msg: "Patient created successfully",
        token: generateToken(createdPatient._id, perr.firstName, perr.role),
      });
    } else {
      throw new Error("Something Went Wrong Invalid User Data!");
    }
  })
);
patientControl.post(
  "/login",
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const person = await Person.findOne({ email: email });
    const patient = await Patient.findOne({ person: person._id });
    if (
      person &&
      password == person.password &&
      person.role == "patient" &&
      patient
    ) {
      res.status(201).json({
        _id: person._id,
        firstName: person.firstName,
        lastName: person.lastName,
        birthDate: person.birthDate,
        image: person.image,
        gender: person.gender,
        role: person.role,
        email: person.email,
        msg: "Patient Logged In Successfully!",
        token: generateToken(patient._id, person.firstName, person.role),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password!" });
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
    try {
      const patient = await patientService.getPatientById(req.params.id);
      const person = await Person.findById(patient.person);
      if (patient) {
        const deletedPatient = await patientService.deletePatient(
          req.params.id
        );
        const deletedPerson = await personService.deletePerson(person._id);
        res.json({ deletedPatient, deletedPerson, message: "Patient Deleted" });
      } else {
        res.status(404).json({ message: "Patient Not Found" });
      }
    } catch (e) {
      res.status(404).json({ message: e });
    }
  })
);

patientControl.get(
  "/getByFirstName/:firstName",
  asyncHandler(async (req, res) => {
    try {
      const patients = await patientService.getPatientByFirstName(
        req.params.firstName
      );
      res.json(patients);
    } catch (err) {
      res.send(404).json({ message: "not found" });
    }
  })
);

patientControl.get(
  "/getByLastName/:lastName",
  asyncHandler(async (req, res) => {
    try {
      const patients = await patientService.getPatientByLastName(
        req.params.lastName
      );
      res.json(patients);
    } catch (err) {
      res.send(404).json({ message: "not found" });
    }
  })
);

export default patientControl;
