import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import personControl from "./controllers/personController.js";
import patientControl from "./controllers/PatientController.js";
import notificationControl from "./controllers/notificationController.js";
import calenderControl from "./controllers/calenderController.js";
import commentControl from "./controllers/commentController.js";
import doctorControl from "./controllers/DoctorController.js";
import RendezVousControl from "./controllers/Rendez-vous.js";
import messageControl from "./controllers/messageController.js";
import notificationAdminControl from "./controllers/NotificationAdminController.js";
import consultationControl from "./controllers/ConsultationController.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
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
app.use("/api/comment", commentControl);
app.use("/api/doctor", doctorControl);
app.use("/api/patient", patientControl);
app.use("/api/RendezVous", RendezVousControl);
app.use("/api/message", messageControl);
app.use("/api/consultation", consultationControl);
app.use("/api/notificationAdmin",notificationAdminControl);

const server = app.listen(5000, console.log("app running...."));
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.broadcast.emit("msg-recieve", {
        from: data.from,
        to: data.to,
        message: data.msg,
      });
    }
  });
});
