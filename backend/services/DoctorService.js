import Doctor from "../models/Doctor.js";
import Person from "../models/Person.js";
const doctorService = {
  async createDoctor({
    person,
    location,
    rating,
    specialty,
    price,
    description,
    experience,
  }) {
    const doctor = await Doctor.create({
      person,
      location,
      rating,
      specialty,
      price,
      description,
      experience,
      joinedAt: new Date(),
    });
    return await doctor.save();
  },
  async getDoctorById(doctorId) {
    const doctor = await Doctor.findById(doctorId).populate({
      path: 'person',
    select: '-password'});
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return doctor;
  },
  async  getAllDoctors() {
    const doctors = await Doctor.find().populate({
      path: 'person',
      select: '-password', // Exclude the "password" field from the query
    });
    return doctors.map((doctor) => doctor.toObject());
  },
  async updateDoctor(doctorId, updateData) {
    const doctor = await Doctor.findById(doctorId).populate("person");
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    doctor.person = updateData.person || doctor.person;
    doctor.location = updateData.doctor || doctor.location;
    doctor.rating = updateData.rating || doctor.rating;
    doctor.specialty = updateData.specialty || doctor.specialty;
    doctor.price = updateData.price || doctor.price;
    doctor.description = updateData.description || doctor.description;
    doctor.experience=updateData.experience || doctor.experience;
    const updatedDoctor = await doctor.save();
    return updatedDoctor.toObject();
  },
  async deleteDoctor(doctorId) {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    await Doctor.findByIdAndDelete(doctorId);
    return doctor;
  },
  async getDoctorBySpeciality(speciality) {
    const doctors = await Doctor.find({ specialty: speciality }).populate(
      {
        path: 'person',
      select: '-password'}
      
    );
    return doctors.map((doctor) => doctor.toObject());
  },
  async getDoctorByFirstName(firstName) {
    const doctors = await Doctor.find()
      .populate({ path: "person", match: { firstName } })
      .exec();
    return doctors
      .filter((doctor) => doctor.person !== null)
      .map((doctor) => doctor.toObject());
  },

  async getDoctorByLastName(lastName) {
    const doctors = await Doctor.find()
      .populate({ path: "person", match: { lastName } })
      .exec();
    return doctors
      .filter((doctor) => doctor.person !== null)
      .map((doctor) => doctor.toObject());
  },
};
export default doctorService;
