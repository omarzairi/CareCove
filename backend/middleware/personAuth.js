import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Person from "../models/Person.js";
const protectPerson = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decrypt = Jwt.verify(token, "CareCove");
      req.person = await Person.findById(decrypt._id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Sorry not authorized Login or Register !" });
    }
  }
  if (!token) {
    res.status(401).json({ msg: "Sorry not authorized Login or Register !" });
  }
});
export default protectPerson;
