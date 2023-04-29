import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Person from "../models/Person";
const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decrypt = Jwt.verify(token, "CareCove");
      req.admin = await Person.findById(decrypt._id);
      if (decrypt.role == "admin") {
        next();
      } else {
        res.status(401).json({
          msg: "Sorry This Function Is Only For Admins Only. Log In With A Admin Account!",
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
export default protectAdmin;
