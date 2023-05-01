import Doctor from "../models/Doctor.js";
import Person from "../models/Person.js";
const doctorService = {
    async createDoctor ({person,location,rating,specialty}) 
    {
        const doctor = await Doctor.create({person,location,rating,specialty});
        return await doctor.save();
    },
    async getDoctorById(doctorId) 
    {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        return doctor;
    },
    async getAllDoctors()
    {
        const doctors = await Doctor.find();
        return doctors.map((doctor) => doctor.toObject());
    },
    async updateDoctor(doctorId,updateData)
    {
        const doctor = await Doctor.findById(doctorId).populate("person");
        if (!doctor){ 
            throw new Error('Doctor not found');
        }
        doctor.person = updateData.person || doctor.person;
        doctor.location = updateData.doctor ||doctor.location;
        doctor.rating = updateData.rating ||  doctor.rating;
        doctor.specialty = updateData.specialty || doctor.specialty;
        const updatedDoctor = await doctor.save();
        return updatedDoctor.toObject();
    },
    async deleteDoctor(doctorId) 
    {
        const doctor = await Doctor.findById(doctorId);
        if(!doctor)
        {
            throw new Error('Doctor not found');
        }
        await Person.findByIdAndDelete(doctor.person);
        await Doctor.findByIdAndDelete(doctorId);
        return doctor.toObject();
    },
};
export default doctorService;