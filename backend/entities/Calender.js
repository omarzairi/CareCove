class CalenderClass {
  constructor(date, doctor) {
    this.date = new Date(date);
    this.doctor = doctor;
  }

  getAvailability() {
    return this.availability;
  }

  setAvailability(avail) {
    this.availability = avail;
  }
  getDate() {
    return this.date;
  }
  setDate(date) {
    this.date = date;
  }
  getHour() {
    return this.hour;
  }
  setHour(hour) {
    this.hour = hour;
  }

  getDoctor() {
    return this.doctor;
  }

  setDoctor(doctor) {
    this.doctor = doctor;
  }
  toObject() {
    return {
      availability: this.availability,
      hour: this.hour,
      date: this.date,
    };
  }
}
export default CalenderClass;
