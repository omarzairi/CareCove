<<<<<<< HEAD
import Person from "./Person.js";
class DoctorClass extends Person{
    constructor(firstName, lastName, birthDate, gender,role, email, password,location,rating,person)
    {
=======
import PersonClass from "./Person.js";

class DoctorClass extends PersonClass{
    constructor(firstName, lastName, birthDate, gender,role, email, password,location,rating){
>>>>>>> 0c0a8f945fe7e55beda2368c6b01bbe689672cc4
        super(firstName, lastName, birthDate, gender,role, email, password);
        this.location = location;
        this.rating = rating;
        this.person=person;
    }
    getPerson() { return this.person; }
    getLocation() { return this.location;}
    getRating() { return this.rating; }
    setPerson(person) { this.person = person; }
    setRating(rating) { this.rating = rating;}
    setLocation(location) { this.location = location;}
     
    toObject() { return {person : this.person, location : this.location ,rating :this.rating};}

}
export default DoctorClass;