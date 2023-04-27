import express from "express";
import asyncHandler from "express-async-handler";
import Person from "../models/Person.js";
import personService from "../services/PersonService.js";
import PersonClass from "../entities/Person.js";

const personControl = express.Router();

personControl.post(
  "/register",
  asyncHandler(async (req, res) => {
      req.body.email = req.body.email.toLowerCase();
      const { firstName,lastName,birthDate, gender, role, email, password } = req.body;
      const exist = await  Person.findOne({ email });
        if (exist) {
            res.status(401).json({ msg: "User With This Email Already Exists!" });
        }else{
            const person = new PersonClass(firstName, lastName, birthDate,gender, role, email, password);
            const createdPerson = await personService.createPerson(person.toObject());
            if(createdPerson){
                res.status(201).json({
                    _id: createdPerson._id,
                    firstName: createdPerson.firstName,
                    lastName: createdPerson.lastName,
                    birthDate: createdPerson.birthDate,
                    gender : createdPerson.gender,
                    role: createdPerson.role,
                    email: createdPerson.email,
                    msg: "User Created Successfully!",});
            }
            else{
                res.status(401).json({ msg: "Something Went Wrong Invalid User Data!" });
            }
        }
  })
);

personControl.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const person = await personService.getPersonById(req.params.id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).json({ message: "Person Not Found" });
        }

    }
));

personControl.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const person = await personService.getPersonById(req.params.id);
        if (person) {
            const updateData = req.body;
            const updatedPerson = await personService.updatePerson(req.params.id, updateData);
            res.json({updatedPerson, message: "Person Updated "} );
        } else {
            res.status(404).json({ message: "Person Not Found" });
        }
    }
)
);

personControl.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const person = await personService.getPersonById(req.params.id);
        if (person) {
            const deletedPerson = await personService.deletePerson(req.params.id);
            res.json({deletedPerson, message: "Person Deleted" });
        } else {
            res.status(404).json({ message: "Person Not Found" });
        }


    }
)
);


export default personControl;
