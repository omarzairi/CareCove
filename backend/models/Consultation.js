import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  marks: { type: String},
  medicine: { type: String},
  date: { type: Date},
});

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;