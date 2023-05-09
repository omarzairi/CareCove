import express from "express";
import asyncHandler from "express-async-handler";
import Person from "../models/Person.js";
import personService from "../services/PersonService.js";
import PersonClass from "../entities/Person.js";
import generateToken from "../utils/generateToken.js";
import protectPatient from "../middleware/patientAuth.js";
import protectPerson from "../middleware/personAuth.js";

const personControl = express.Router();

personControl.get(
  "/",
 
  asyncHandler(async (req, res) => {
    const persons = await personService.getAllPersons();
    res.json(persons);
  })
);

personControl.post(
  "/register",
  asyncHandler(async (req, res) => {
    req.body.email = req.body.email.toLowerCase();
    const { firstName, lastName, birthDate,image, gender, role, email, password } =
      req.body;
    const exist = await Person.findOne({ email });
    if (exist) {
      res.status(401).json({ msg: "User With This Email Already Exists!" });
    } else {
      const person = new PersonClass(
        firstName,
        lastName,
        birthDate,
        image,
        gender,
        role,
        email,
        password
      );
      const createdPerson = await personService.createPerson(person.toObject());
      if (createdPerson) {
        res.status(201).json({
          _id: createdPerson._id,
          firstName: createdPerson.firstName,
          lastName: createdPerson.lastName,
          birthDate: createdPerson.birthDate,
          image: createdPerson.image,
          gender: createdPerson.gender,
          role: createdPerson.role,
          email: createdPerson.email,
          msg: "User Created Successfully!",
          token: generateToken(
            createdPerson._id,
            createdPerson.firstName,
            createdPerson.role
          ),
        });
      } else {
        res
          .status(401)
          .json({ msg: "Something Went Wrong Invalid User Data!" });
      }
    }
  })
);

personControl.get(
  "/:id",
  protectPerson,
  asyncHandler(async (req, res) => {
    try {
      const person = await personService.getPersonById(req.person._id);
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ message: "Person Not Found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

personControl.put(
  "/:id",
  protectPerson,
  asyncHandler(async (req, res) => {
    try {
      const person = await personService.getPersonById(req.person._id);
      if (person) {
        const updateData = req.body;
        const updatedPerson = await personService.updatePerson(
          req.person._id,
          updateData
        );
        res.json({ updatedPerson, message: "Person Updated " });
      } else {
        res.status(404).json({ message: "Person Not Found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

personControl.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const person = await personService.getPersonById(req.person._id);
      if (person) {
        const deletedPerson = await personService.deletePerson(req.person._id);
        res.json({ deletedPerson, message: "Person Deleted" });
      } else {
        res.status(404).json({ message: "Person Not Found" });
      }
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

export default personControl;
