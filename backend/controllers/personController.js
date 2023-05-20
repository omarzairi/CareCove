import express from "express";
import asyncHandler from "express-async-handler";
import Person from "../models/Person.js";
import personService from "../services/PersonService.js";
import PersonClass from "../entities/Person.js";
import generateToken from "../utils/generateToken.js";
import protectPatient from "../middleware/patientAuth.js";
import protectPerson from "../middleware/personAuth.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files should be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use a unique filename to prevent overwriting
  },
});

const upload = multer({ storage: storage });

const personControl = express.Router();
personControl.post(
  "/login",
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const person = await Person.findOne({ email: email });
    console.log(person.firstName);
    if (person && password == person.password && person.role == "admin") {
      res.status(201).json({
        _id: person._id,
        firstName: person.firstName,
        lastName: person.lastName,
        birthDate: person.birthDate,
        gender: person.gender,
        role: person.role,
        email: person.email,
        msg: "Admin Logged In Successfully!",
        token: generateToken(person._id, person.firstName, person.role),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password!" });
    }
  })
);
personControl.get(
  "/",
  asyncHandler(async (req, res) => {
    const persons = await personService.getAllPersons();
    res.json(persons);
  })
);

personControl.post(
  "/register",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    try {
      req.body.email = req.body.email.toLowerCase();
      const { firstName, lastName, birthDate, gender, role, email, password } =
        req.body;

      const exist = await Person.findOne({ email });
      if (exist) {
        res.status(401).json({ msg: "User With This Email Already Exists!" });
      } else {
        let result = {
          secure_url:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        };
        if (req.file) {
          const image = req.file.path;

          result = await cloudinary.uploader.upload(image, {
            folder: "person",
          });
        }
        const person = new PersonClass(
          firstName,
          lastName,
          birthDate,
          result.secure_url,
          gender,
          role,
          email,
          password
        );
        console.log(person.toObject());
        const createdPerson = await personService.createPerson(
          person.toObject()
        );
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
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err.message,
      });
    }
  })
);

personControl.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const person = await personService.getPersonById(req.params.id);
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
personControl.put(
  "/changePassword/:id",
  asyncHandler(async (req, res) => {
    const updatedPerson = await personService.changePassword(req.params.id, {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    });
    if (updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).json({ message: "Invalid password provided" });
    }
  })
);

export default personControl;
