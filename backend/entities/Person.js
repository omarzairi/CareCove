class PersonClass {
  constructor(firstName, lastName, birthDate, gender,role, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = new Date(birthDate);
    this.role = role;
    this.gender=gender;

    this.email = email;
    this.password = password;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getBirthDate() {
    return this.birthDate;
  }

  getRole() {
    return this.role;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setBirthDate(birthDate) {
    this.birthDate = birthDate;
  }

  setRole(role) {
    this.role = role;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }
  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      gender:this.gender,
      role: this.role,
      email: this.email,
      password: this.password,
    };
  }
}

export default PersonClass;