class CommentClass{
    constructor(text,rating,date,patient) {
        this.text=text;
        this.rating=rating;
        this.date=new Date(date);
        this.patient=patient;
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
            patient : this.patient
        }
    }

}

export default CommentClass;
