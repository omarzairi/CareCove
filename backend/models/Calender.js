import mongoose from "mongoose";
const CalenderSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  availability: { type: Boolean, required: true },
  hour: { type: Number, required: true },
  date: { type: Date, required: true },
});
const Calender = mongoose.model("Calender", CalenderSchema);
export default Calender;
