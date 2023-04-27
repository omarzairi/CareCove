class Person {
  constructor(
    private firstName: String,
    private lastName: String,
    private birthDate: Date,
    private role: String,
    private email: String,
    private password: String
  ) {}

  getFirstName(): String {
    return this.firstName;
  }
  getLastName(): String {
    return this.lastName;
  }
  getBirthDate(): Date {
    return this.birthDate;
  }
  getRole(): String {
    return this.role;
  }
  getEmail(): String {
    return this.email;
  }
  getPassword(): String {
    return this.password;
  }

  setFirstName(firstName: String): void {
    this.firstName = firstName;
  }
  setLastName(lastName: String): void {
    this.lastName = lastName;
  }
  setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }
  setRole(role: String): void {
    this.role = role;
  }
  setEmail(email: String): void {
    this.email = email;
  }
  setPassword(password: String): void {
    this.password = password;
  }
}
