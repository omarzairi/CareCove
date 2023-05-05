import PersonClass from "./Person.js";

class DoctorClass extends PersonClass{
    constructor(firstName, lastName, birthDate,image, gender,role, email, password,person,location,rating,specialty,price,description)
    {
        super(firstName, lastName, birthDate,image, gender,role, email, password);
        this.location = location;
        this.rating = rating;
        this.person=person;
        this.specialty=specialty;
        this.price=price;
        this.description=description;
    }
    getPerson() { return this.person; }
    getDescription(){return this.description;}
    getLocation() { return this.location;}
    getRating() { return this.rating; } 
    getSpecialty(){return this.specialty}
    getPrice(){return this.price}
    setPerson(person) { this.person = person; }
    setRating(rating) { this.rating = rating;}
    setLocation(location) { this.location = location;}
    setSpecialty(specialty){ this.specialty=specialty;}
    setPrice(price){this.price=price}
    setDescription(description){this.description=description;}
    toObject() { return {person : this.person, location : this.location ,rating :this.rating,specialty:this.specialty,price:this.price,description:this.description};}

}
export default DoctorClass;