import Jwt from "jsonwebtoken";

const generateToken = (_id, name, role) => {
  return Jwt.sign({ _id, name, role }, "CareCove", {
    expiresIn: "30d",
  });
};
export default generateToken;
