
import Consultation from "../models/Consultation.js";

const consultationService = {
  async createConsultation({ doctorId, patientId, marks, medicine }) {
    const consultation = await Consultation.create({
      doctorId,
      patientId,
      marks,
      medicine,
      date : new Date(),
    });
    return await consultation.save();
  },

  async getConsultationById(consultationId) {
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      throw new Error("Consultation not found");
    }
    return consultation.toObject();
  },

  async getAllConsultations() {
    const consultations = await Consultation.find();
    return consultations.map((consultation) => consultation.toObject());
  },

  async updateConsultation(consultationId, updateData) {
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      throw new Error("Consultation not found");
    }
    consultation.doctorId = updateData.doctorId || consultation.doctorId;
    consultation.patientId = updateData.patientId || consultation.patientId;
    consultation.marks = updateData.marks || consultation.marks;
    consultation.medicine = updateData.medicine || consultation.medicine;
    consultation.date = updateData.date || consultation.date;

    const updatedConsultation = await consultation.save();
    return updatedConsultation.toObject();
  },

  async deleteConsultation(consultationId) {
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      throw new Error("Consultation not found");
    }
    await Consultation.findByIdAndDelete(consultationId);
    return consultation.toObject();
  },
};

export default consultationService;
