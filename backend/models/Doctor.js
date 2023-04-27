import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema({
    person : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"Person",
    },
    location: { type: String, required: true },
    rating: { type: Number, required: true , default:null },
  });

  const Doctor = mongoose.model("Doctor", DoctorSchema);
  
  export default Doctor;