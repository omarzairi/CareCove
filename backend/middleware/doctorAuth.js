import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Person from "../models/Person";
import Docter from "../models/Doctor.js";
const protectDoctor = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decrypt = Jwt.verify(token, "CareCove");
      req.doctor = await Docter.findById(decrypt._id);
      if (decrypt.role == "doctor") {
        next();
      } else {
        res.status(401).json({
          msg: "Sorry This Function Is Only For Doctors Only. Log In With A Doctor Account!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Sorry not authorized Login or Register !" });
    }
  }
  if (!token) {
    res.status(401).json({ msg: "Sorry not authorized Login or Register !" });
  }
});
export default protectDoctor;
