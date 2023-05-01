class CommentClass{
    constructor(text,rating,date,patient,doctor) {
        this.text=text;
        this.rating=rating;
        this.date=new Date(date);
        this.patient=patient;
        this.doctor=doctor;
    }

    getText()
    {
        return this.text;
    }

    getRating()
    {
        return this.rating;
    }

    getDate()
    {
        return this.date;
    }

    getDoctor()
    {
        return this.doctor;    
    }

    getPatient()
    {
        return this.patient;
    }

    setText(text)
    {
        this.text=text;
    }

    setRating(rating)
    {
        this.rating=rating;
    }

    setDate(date)
    {
        this.date=date;
    }

    setDoctor(doctor)
    {
        this.doctor=doctor;
    }

    setPatient(patient)
    {
        this.patient=patient;
    }

    toObject()
    {
        return {
            text: this.text,
            rating: this.rating,
            date: this.date,
            doctor : this.doctor,
            patient : this.patient
        }
    }

}

export default CommentClass;
