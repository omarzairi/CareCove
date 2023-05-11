import Patient from "../models/Patient.js";
import Person from "../models/Person.js";

const patientService = {
  async createPatient({
    person,
    allergies,
    bloodType,
    height,
    weight,
    amount,
  }) {
    const patient = await Patient.create({
      person,
      allergies,
      bloodType,
      height,
      weight,
      amount,
      joinedAt: new Date(),
    });
    return await patient.save();
  },
  async getPatientById(patientId) {
    const patient = await Patient.findById(patientId).populate("person");
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
    patient.amount = updateData.amount || patient.amount;

    const updatedPatient = await patient.save();
    return updatedPatient.toObject();
  },
  async deletePatient(patientId) {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }
    await Patient.findByIdAndDelete(patientId);
    return patient;
  },
  async getPatientByFirstName(firstName) {
    const patients = await Patient.find()
      .populate({ path: "person", match: { firstName } })
      .exec();
    return patients
      .filter((patient) => patient.person !== null)
      .map((patient) => patient.toObject());
  },

  async getPatientByLastName(lastName) {
    const patients = await Patient.find()
      .populate({ path: "person", match: { lastName } })
      .exec();
    return patients
      .filter((patient) => patient.person !== null)
      .map((patient) => patient.toObject());
  },
  async changePassword(patientId,{oldPassword,newPassword}) 
  {
    const patient=await Patient.findById(patientId).populate("person");
    if(patient)
    {
    if (patient.person.password==oldPassword)
    { 
       patient.person.password = newPassword;
        const updatedPatient = await patient.save();
        
        return updatedPatient.toObject();
    }
    else throw new Error("Invalid password provided");
  }
  else throw new Error("Patient not found");
}

};

export default patientService;
