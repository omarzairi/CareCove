import express from "express";
import asyncHandler from "express-async-handler";
import protectPatient from "../middleware/patientAuth.js";
import protectDoctor from "../middleware/doctorAuth.js";
import messageService from "../services/MessageService.js";
import Message from "../models/Message.js";
import Person from "../models/Person.js";

const messageControl = express.Router();

messageControl.post(
  "/patientSend",
  protectPatient,

  asyncHandler(async (req, res) => {
    try {
      const person = await Person.findById(req.patient.person);
      const from = person._id;
      const to = req.body.to;
      const message = await messageService.createMessage({
        message: { text: req.body.message },
        sender: from,
        users: [from.toString(), to.toString()],
      });
      if (message) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/doctorSend",
  protectDoctor,
  asyncHandler(async (req, res) => {
    try {
      const person = await Person.findById(req.doctor.person);
      const from = person._id;
      const to = req.body.to;
      const message = await messageService.createMessage({
        message: { text: req.body.message },
        sender: from,
        users: [from.toString(), to.toString()],
      });
      if (message) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/getmessages",
  protectPatient,
  asyncHandler(async (req, res) => {
    try {
      const person = await Person.findById(req.patient.person);
      const from = person._id;
      const to = req.body.to;
      const messages = await Message.find({
        users: { $all: [from.toString(), to.toString()] },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from.toString(),
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/getmessagesDoctor",
  protectDoctor,
  asyncHandler(async (req, res) => {
    try {
      const person = await Person.findById(req.doctor.person);
      const from = person._id;
      const to = req.body.to;
      const messages = await Message.find({
        users: { $all: [from.toString(), to.toString()] },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from.toString(),
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/getmessagesPatient",
  protectPatient,
  asyncHandler(async (req, res) => {
    try {
      const person = await Person.findById(req.patient.person);
      const from = person._id;
      const to = req.body.to;
      const messages = await Message.find({
        users: { $all: [from.toString(), to.toString()] },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from.toString(),
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
//delete all
messageControl.delete(
  "/deleteAll",

  asyncHandler(async (req, res) => {
    try {
      const messages = await Message.deleteMany({});
      if (messages) return res.json({ msg: "Messages deleted successfully." });
      else
        return res.json({ msg: "Failed to delete messages from the database" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
export default messageControl;
