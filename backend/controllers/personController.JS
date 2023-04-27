import express from "express";
import asyncHandler from "express-async-handler";
import Person from "../models/Person.js";

const personControl = express.Router();

personControl.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, role, email, password } = req.body;
    const birthDate = new Date(req.body.birthDate);
    const person = new Person({
      firstName,
      lastName,
      birthDate,
      role,
      email,
      password,
    });
    const createdPerson = await person.save();
    res.status(201).json(createdPerson);
  })
);

export default personControl;
