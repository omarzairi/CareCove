import PersonClass from "./Person.js";

class DoctorClass extends PersonClass{
    constructor(firstName, lastName, birthDate, gender,role, email, password,person,location,rating,specialty)
    {
        super(firstName, lastName, birthDate, gender,role, email, password);
        this.location = location;
        this.rating = rating;
        this.person=person;
        this.specialty=specialty;
    }
    getPerson() { return this.person; }
    getLocation() { return this.location;}
    getRating() { return this.rating; } 
    getSpecialty(){return this.specialty}
    setPerson(person) { this.person = person; }
    setRating(rating) { this.rating = rating;}
    setLocation(location) { this.location = location;}
    setSpecialty(specialty){ this.specialty=specialty;}
    toObject() { return {person : this.person, location : this.location ,rating :this.rating,specialty:this.specialty};}

}
export default DoctorClass;