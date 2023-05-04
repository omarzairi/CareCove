import RendezVous from "../models/Rendez-vous.js";
import express from "express";
import bcrypt from "bcryptjs";
import res from "express/lib/response.js";

const RendezVousService = {
  async createRendezVous({
    Patient,
    Doctor,
    dateRV,
    heureRV
  }) {
    const RendezVous = await RendezVous.create({
        Patient,
        Doctor,
        dateRV,
        heureRV
    });
    return await RendezVous.save();
  },
  async getRendezVousById(RendezVousId) {
    const RendezVous = await RendezVousId.findById(RendezVousId).select("-password");
    console.log(RendezVousId, "h", RendezVous, "h");
    if (!RendezVous) {
      throw new Error("RendezVous not found");
    }
    return RendezVous;
  },
  async getAllRendezVous() {
    const RVS = await RendezVous.find();
    return RVS.map((RendezVous) => RendezVous.toObject());
  },

  async updateRendezVous(RendezVousId, updateData) {
    const RV = await RendezVous.findById(RendezVousId);
    if (!RendezVous) {
      throw new Error("RendezVous not found");
    }
    RendezVous.Patient = updateData.Patient || Patient.firstName;
    RendezVous.Doctor = updateData.Doctor || RendezVous.Doctor;
    RendezVous.dateRV = updateData.dateRV || RendezVous.dateRV;
    RendezVous.heureRV = updateData.heureRV || RendezVous.heureRV;
   
    const updatedRendezVous = await RendezVous.save();
    return updatedRendezVous.toObject();
  },

  async deleteRendezVous(RendezVousId) {
    const RendezVous = await RendezVous.findById(RendezVous);
    if (!RendezVous) {
      throw new Error("RendezVous not found");
    }
    await RendezVous.findByIdAndDelete(RendezVousId);
    return RendezVous.toObject();
  },
};

export default RendezVousService;
