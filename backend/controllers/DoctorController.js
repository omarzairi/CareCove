import express from "express";
import asyncHandler from "express-async-handler";
import DoctorClass from "../entities/Doctor.js";
import doctorService from "../services/DoctorService.js";

const doctorControl = express.Router();
 doctorControl.post(
    "/register/doctor",
    asyncHandler(async(doc) => 
    {
        const doctor = new DoctorClass(firstName, lastName, birthDate, gender,role, email, password,location,rating);
        const createdDoctor = await doctorService.createDoctor(doctor.toObject());
        if (createdDoctor){
            doc.statusCode(201).json({
                _id:createdDoctor._id,
                person:createdDoctor.person,
                location:createdDoctor.location,
                rating:createdDoctor.rating,
                msg: " Doctor created successfully",
            });
        }
        else{
            throw new Error("Something Went Wrong Invalid User Data!");        }
    })

 );
 doctorControl.get(
    "doctor/",
    asyncHandler(async (req, res) => {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    })
  );
 doctorControl.get(
    "/doctor/",
    asyncHandler(async (req, res) => {
        const doctor = await doctorService.getDoctorById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: "doctor Not Found" });
        }

    }
    ));
    doctorControl.put(
        "/doctor/",
        asyncHandler(async (req, res) => {
            const doctor = await doctorService.getDoctorById(req.params.id);
            if (doctor) {
                const updateData = req.body;
                const updatedDoctor = await doctorService.updateDoctor(req.params.id, updateData);
                res.json({updatedDoctor, message: "Doctor Updated "} );
            } else {
                res.status(404).json({ message: "Doctor Not Found" });
            }
        }
    )
    );
    doctorControl.delete(
        "/doctor/",
        asyncHandler(async (req, res) => {
            const doctor = await doctorService.getDoctorById(req.params.id);
            if (doctor) {
                const deletedDoctor = await doctorService.updateDoctor(req.params.id);
                res.json({deletedDoctor, message: "Doctor Deleted" });
            } else {
                res.status(404).json({ message: "Doctor Not Found" });
            }
    
    
        }
    )
    );
    export default doctorControl;