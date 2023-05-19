class Consultation {
    constructor(doctorId, patientId, marks, medicine, date) {
      this.doctorId = doctorId;
      this.patientId = patientId;
      this.marks = marks;
      this.medicine = medicine;
      this.date = new Date(date);
    }
  
    getDoctorId() {
      return this.doctorId;
    }
  
    getPatientId() {
      return this.patientId;
    }
  
    getMarks() {
      return this.marks;
    }
  
    getMedicine() {
      return this.medicine;
    }
  
    getDate() {
      return this.date;
    }
  
    setDoctorId(doctorId) {
      this.doctorId = doctorId;
    }
  
    setPatientId(patientId) {
      this.patientId = patientId;
    }
  
    setMarks(marks) {
      this.marks = marks;
    }
  
    setMedicine(medicine) {
      this.medicine = medicine;
    }
  
    setDate(date) {
      this.date = new Date(date);
    }
  
    toObject() {
      return {
        doctorId: this.doctorId,
        patientId: this.patientId,
        marks: this.marks,
        medicine: this.medicine,
        date: this.date,
      };
    }
  }
  
  export default Consultation;
  