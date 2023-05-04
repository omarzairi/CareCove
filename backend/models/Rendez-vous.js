import mongoose from "mongoose";
const RendezVousSchema = new mongoose.Schema({
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"Doctor",
    },
    dateRV: { type: Date , required: true },
    Patient : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"Patient",
    },
    heureRV: { type: Number , required: true },
  });

  const RendezVous = mongoose.model("RendezVous", RendezVousSchema);
  
  export default RendezVous;