import mongoose from "mongoose";
const PersonSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    required: true,
  },
  email: { type: String, required: true, unique: true },

  password: {
    type: String,
    required: true,
  },
});
const Person = mongoose.model("Person", PersonSchema);
export default Person;
