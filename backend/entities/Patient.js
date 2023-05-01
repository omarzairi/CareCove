import PersonClass from "./Person.js";

class PatientClass extends PersonClass {
  constructor(
    firstName,
    lastName,
    birthDate,
    gender,
    role,
    email,
    password,
    allergies,
    bloodType,
    height,
    weight
  ) {
    super(firstName, lastName, birthDate, gender, role, email, password);
    this.allergies = allergies;
    this.bloodType = bloodType;
    this.height = height;
    this.weight = weight;
  }

  getAllergies() {
    return this.allergies;
  }
  getBloodType() {
    return this.bloodType;
  }
  getHeight() {
    return this.height;
  }
  getWeight() {
    return this.weight;
  }

  setAllergies(allergies) {
    this.allergies = allergies;
  }
  setBloodType(bloodType) {
    this.bloodType = bloodType;
  }
  setHeight(height) {
    this.height = height;
  }
  setWeight(weight) {
    this.weight = weight;
  }

  toObject() {
    return {
      ...super.toObject(),
      allergies: this.allergies,
      bloodType: this.bloodType,
      height: this.height,
      weight: this.weight,
    };
  }
}

export default PatientClass;
