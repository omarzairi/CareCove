import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, required:true,ref: "Doctor", },
  patientId: { type: mongoose.Schema.Types.ObjectId,required:true, ref: "Patient" },
  marks: { type: String,required:true},
  medicine: { type: String,required:true},
  date: { type: Date},
});

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;