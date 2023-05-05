import PersonClass from "./Person.js";

class DoctorClass extends PersonClass{
    constructor(firstName, lastName, birthDate,image, gender,role, email, password,person,location,rating,specialty,price)
    {
        super(firstName, lastName, birthDate,image, gender,role, email, password);
        this.location = location;
        this.rating = rating;
        this.person=person;
        this.specialty=specialty;
        this.price=price;
    }
    getPerson() { return this.person; }
    getLocation() { return this.location;}
    getRating() { return this.rating; } 
    getSpecialty(){return this.specialty}
    getPrice(){return this.price}
    setPerson(person) { this.person = person; }
    setRating(rating) { this.rating = rating;}
    setLocation(location) { this.location = location;}
    setSpecialty(specialty){ this.specialty=specialty;}
    setPrice(price){this.price=price}
    toObject() { return {person : this.person, location : this.location ,rating :this.rating,specialty:this.specialty,price:this.price};}

}
export default DoctorClass;