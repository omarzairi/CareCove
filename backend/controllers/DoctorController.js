import express from "express";
import asyncHandler from "express-async-handler";
import DoctorClass from "../entities/Doctor.js";
import doctorService from "../services/DoctorService.js";
import Doctor from "../models/Doctor.js";
import Person from "../models/Person.js";
import personService from "../services/PersonService.js";
const doctorControl = express.Router();
 doctorControl.post(
    "/register",
    asyncHandler(async(req,res) => 
    {
        const { person, rating, location, specialty ,price,description} = req.body;
        const docc = await Person.findById(person);
        const doctor = new DoctorClass(
            docc.firstName, 
            docc.lastName, 
            docc.birthDate,
            docc.image, 
            docc.gender,
            docc.role, 
            docc.email, 
            docc.password,
            docc._id,
            location,
            rating,
            specialty,
            price,
            description,
            );
            console.log(doctor);
        const createdDoctor = await doctorService.createDoctor(
            {
                person:docc._id,
                location:doctor.location,
                rating:doctor.rating,
                specialty:doctor.specialty,
                price:doctor.price,
                description:doctor.description,
            }
        );
        if (createdDoctor){
            res.status(201).json({
                _id:createdDoctor._id,
                person:createdDoctor.person,
                location:createdDoctor.location,
                rating:createdDoctor.rating,
                specialty:createdDoctor.specialty,
                price:createdDoctor.price,
                description:createdDoctor.description,
                msg: " Doctor created successfully",
            });
        }
        else{
            throw new Error("Something Went Wrong Invalid User Data!");        }
    })

 );
 doctorControl.get(
    "/",
    asyncHandler(async (req, res) => {
        try
        {
            const doctors = await doctorService.getAllDoctors();
            res.json(doctors);
        }
        catch(err)
        {
            res.send(404).json({message:"not found"})
        }

      
    })
  );
 doctorControl.get(
    "/:id",
    asyncHandler(async (req, res) => 
    {
        const doctor = await doctorService.getDoctorById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: "doctor Not Found" });
        }

    }
    ));
    doctorControl.put(
        "/:id",
        asyncHandler(async (req, res) => {
            const doctor = await doctorService.getDoctorById(req.params.id);
            if (doctor) {
                const updateData = req.body;
                const updatedDoctor = await doctorService.updateDoctor(
                    req.params.id, 
                    updateData);
                res.json({updatedDoctor, message: "Doctor Updated "} );
            } else {
                res.status(404).json({ message: "Doctor Not Found" });
            }
        }
    )
    );
    doctorControl.delete(
        "/:id",
        asyncHandler(async (req, res) => {
            try
            {
                const doctor = await doctorService.getDoctorById(req.params.id);
                const person = await Person.findById(doctor.person);
                if (doctor) {
                    const deletedDoctor = await doctorService.deleteDoctor(req.params.id);
                    const deletedPerson = await personService.deletePerson(person._id);
                    res.json({deletedDoctor,deletedPerson, message: "Doctor Deleted" });
            }   
                else 
                {
                    res.status(404).json({ message: "Doctor Not Found" });
                }
            }
            catch(e)
            {
                res.status(404).json({message : e});
            }
            
    
    
        }
    )
    );

    doctorControl.get(
        "/getBySpeciality/:specialty",
        asyncHandler(async (req, res) => 
        {
            try {
            const doctor = await doctorService.getDoctorBySpeciality(req.params.specialty);
            
                res.json(doctor);
            }
            
                catch(err)
        {
            res.send(404).json({message:"not found"})
        }
    
        }
        ));

    doctorControl.get(
        "/getByFirstName/:firstName",
        asyncHandler(async (req, res) =>
        {
            try{
            const doctors= await doctorService.getDoctorByFirstName(req.params.firstName);
            res.json(doctors);
            }
            catch(err)
            {
                res.send(404).json({message:"not found"})      }
            }
        ));

        doctorControl.get(
            "/getByLastName/:lastName",
            asyncHandler(async (req, res) =>
            {
                try{
                const doctors= await doctorService.getDoctorByLastName(req.params.lastName);
                res.json(doctors);
                }
                catch(err)
                {
                    res.send(404).json({message:"not found"})      }
                }
            ));


    export default doctorControl;