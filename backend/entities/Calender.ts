class Calender{
    constructor(private availability:boolean,private hour:number,private date:Date){

    }

    getAvailability():boolean
    {
        return this.availability;
    }

    setAvailability(avail):void
    {
        this.availability = avail;

    }
    getDate():Date
    {
        return this.date;
    }
    setDate(date:Date):void{
        this.date = date;
    }
    getHour():number{
        return this.hour;
    }
    setHour(hour:number):void{
        this.hour = hour;
    }
    
}