import mongoose from "mongoose";
import Person from "./Person.js";
const DoctorSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },
  location: { type: String, required: true },
  rating: { type: Number, required: true, default: null },
  specialty: {
    type: String,
    enum: [
      "General Practitioner",
      "Pediatrician",
      "Psychiatrist",
      "Dermatologist",
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: { type: String, required: true },
  experience: { type: Number, required: true },
  joinedAt: { type: Date },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
