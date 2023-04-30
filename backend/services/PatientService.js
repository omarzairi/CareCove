import Patient from "../models/Patient.js";
import Person from "../models/Person.js";

const patientService = {
  async createPatient({ person, allergies, bloodType, height, weight }) {
    const patient = await Patient.create({
      person,
      allergies,
      bloodType,
      height,
      weight,
    });
    return await patient.save();
  },
  async getPatientById(patientId) {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return patient;
  },
  async getAllPatients() {
    const patients = await Patient.find().populate("person");
    return patients.map((patient) => patient.toObject());
  },
  async updatePatient(patientId, updateData) {
    const patient = await Patient.findById(patientId).populate("person");
    if (!patient) {
      throw new Error("Patient not found");
    }
    patient.person = updateData.person || patient.person;
    patient.allergies = updateData.allergies || patient.allergies;
    patient.bloodType = updateData.bloodType || patient.bloodType;
    patient.height = updateData.height || patient.height;
    patient.weight = updateData.weight || patient.weight;
    const updatedPatient = await patient.save();
    return updatedPatient.toObject();
  },
  async deletePatient(patientId) {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }
    await Person.findByIdAndDelete(patient.person);
    await Patient.findByIdAndDelete(patientId);
    return patient.toObject();
  },
};

export default patientService;
