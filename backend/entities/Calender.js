class CalenderClass{
    constructor( availability, hour, date){
        this.availability=availability;
        this.hour=hour;
        this.date=new Date(date);

    }

    getAvailability()
    {
        return this.availability;
    }

    setAvailability(avail)
    {
        this.availability = avail;

    }
    getDate()
    {
        return this.date;
    }
    setDate(date){
        this.date = date;
    }
    getHour(){
        return this.hour;
    }
    setHour(hour){
        this.hour = hour;
    }

    toObject(){
        return {
            availability : this.availability,
            hour: this.hour,
            date : this.date
        };
    }


}
export default CalenderClass;