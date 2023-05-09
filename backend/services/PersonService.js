import Person from "../models/Person.js";
import PersonClass from "../entities/Person.js";
import asyncHandler from "express-async-handler";
import express from "express";
import bcrypt from "bcryptjs";
import res from "express/lib/response.js";

const personService = {
  async createPerson({
    firstName,
    lastName,
    birthDate,
    image,
    role,
    gender,
    email,
    password,
  }) {
    const person = await Person.create({
      firstName,
      lastName,
      birthDate,
      image,
      gender,
      role,
      email,
      password,
    });
    return await person.save();
  },
  async getPersonById(personId) {
    const person = await Person.findById(personId).select("-password");
    console.log(personId, "h", person, "h");
    if (!person) {
      throw new Error("Person not found");
    }
    return person;
  },
  async getAllPersons() {
    const persons = await Person.find();
    return persons.map((person) => person.toObject());
  },

  async updatePerson(personId, updateData) {
    const person = await Person.findById(personId);
    if (!person) {
      throw new Error("Person not found");
    }
    person.firstName = updateData.firstName || person.firstName;
    person.lastName = updateData.lastName || person.lastName;
    person.birthDate = updateData.birthDate || person.birthDate;
    person.image = updateData.image || person.image;

    person.gender = updateData.gender || person.gender;
    person.role = updateData.role || person.role;
    person.email = updateData.email || person.email;
    person.password = updateData.password || person.password;
    const updatedPerson = await person.save();
    return updatedPerson.toObject();
  },

  async deletePerson(personId) {
    const person = await Person.findById(personId);
    if (!person) {
      throw new Error("Person not found");
    }
    await Person.findByIdAndDelete(personId);
    return person;
  },
};

export default personService;
