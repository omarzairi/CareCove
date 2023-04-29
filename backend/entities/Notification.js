class NotificationClass {
    constructor(action,dateNotification,person) {
      this.action = action;
      this.dateNotification = new Date(dateNotification);
      this.person = person;
     
    }
  
    getAction() {
      return this.action;
    }
  

  
    getDateNotification() {
      return this.dateNotification;
    }
  
  
  
    getPerson() {
      return this.person;
    }
  
    setAction(action) {
      this.action = action;
    }
  
    setDateNotification(dateNotification) {
      this.dateNotification = dateNotification;
    }

    setPerson(person) {
        this.person = person;
      }
  
  
  
   
    toObject() {
      return {
        action: this.action,
       
        dateNotification : this.dateNotification,
       
        person: this.person,
      };
    }
  }
  
  export default NotificationClass;