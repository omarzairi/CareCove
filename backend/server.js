import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import personControl from "./controllers/personController.js";
import patientControl from "./controllers/PatientController.js";
import notificationControl from "./controllers/notificationController.js";
import calenderControl from "./controllers/calenderController.js";
import commentControl from "./controllers/commentController.js";
import doctorControl from "./controllers/DoctorController.js";

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

connectDB();

app.get("/public", (req, res) => {
  res.send("<center><b>Welcome To CareCove </b> <br>api running :)</center");
});
app.use("/api/person", personControl);
app.use("/api/notification", notificationControl);
app.use("/api/calender", calenderControl);
<<<<<<< HEAD
app.use("/api/comment",commentControl);
app.use("/api/doctor",doctorControl)
=======
app.use("/api/patient", patientControl);
>>>>>>> 0c0a8f945fe7e55beda2368c6b01bbe689672cc4
app.listen(5000, console.log("app running...."));
