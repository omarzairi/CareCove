import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema({
    person : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"Person",
    },
    allergies: [{ type: String }],
    bloodType: { type: String , required: true },
    height: { type: Number , required: true },
    weight: { type: Number , required: true },
  });

  const Patient = mongoose.model("Patient", PatientSchema);
  
  export default Patient; 