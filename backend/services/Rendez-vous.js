import RendezVous from "../models/Rendez-vous.js";
import express from "express";
import bcrypt from "bcryptjs";
import res from "express/lib/response.js";

const RendezVousService = {
  async createRendezVous({ Patient, doctor, dateRV, heureRV }) {
    const rendezVous = await RendezVous.create({
      Patient,
      doctor,
      dateRV,
      heureRV,
    });
    return await rendezVous.save();
  },
  async getRendezVousById(RendezVousId) {
    const rendezVous = await RendezVous.findById(RendezVousId).select(
      "-password"
    );
    if (!rendezVous) {
      throw new Error("RendezVous not found");
    }
    return rendezVous;
  },
  async getAllRendezVous() {
    const RVS = await RendezVous.find();
    return RVS.map((RendezVous) => RendezVous.toObject());
  },

  async updateRendezVous(RendezVousId, updateData) {
    const RV = await RendezVous.findById(RendezVousId);
    if (!RV) {
      throw new Error("RendezVous not found");
    }
    RV.Patient = updateData.Patient || Patient.firstName;
    RV.Doctor = updateData.doctor || RV.doctor;
    RV.dateRV = updateData.dateRV || RV.dateRV;
    RV.heureRV = updateData.heureRV || RV.heureRV;

    const updatedRendezVous = await RendezVous.save();
    return updatedRendezVous.toObject();
  },

  async deleteRendezVous(RendezVousId) {
    const rendezVous = await RendezVous.findById(RendezVous);
    if (!rendezVous) {
      throw new Error("RendezVous not found");
    }
    await rendezVous.findByIdAndDelete(RendezVousId);
    return rendezVous.toObject();
  },
};

export default RendezVousService;
