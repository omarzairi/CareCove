import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import personControl from "./controllers/personController.js";

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("<center><b>Welcome To CareCove </b> <br>api running :)</center");
});
app.use("/api/person", personControl);

app.listen(5000, console.log("app running...."));
