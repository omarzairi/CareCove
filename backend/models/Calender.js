import mongoose from "mongoose";
const CalenderSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  availability: [
    {
      time: {
        type: Number,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
  ],
});
const Calender = mongoose.model("Calender", CalenderSchema);
export default Calender;
