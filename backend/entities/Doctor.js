class DoctorClass extends Person{
    constructor(firstName, lastName, birthDate, gender,role, email, password,location,rating){
        super(firstName, lastName, birthDate, gender,role, email, password);
        this.location = location;
        this.rating = rating;
    }
    constructor(person,location,rating){
        this.person=person;
        this.location=location;
        this.rating=rating;
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