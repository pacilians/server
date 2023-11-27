class Notification {
    constructor(id, id_customer, type, id_person, name_person, created_at, message, is_read) {
      this.id = id;
      this.id_customer = id_customer;
      this.type = type;
      this.id_person = id_person;
      this.name_person = name_person;
      this.created_at = created_at;
      this.message = message;
      this.is_read = is_read || 0; // Default value for is_read is set to 0
    }
  
    spread(data) {
      this.id = data.id;
      this.id_customer = data.id_customer;
      this.type = data.type;
      this.id_person = data.id_person;
      this.name_person = data.name_person;
      this.created_at = data.created_at;
      this.message = data.message;
      this.is_read = data.is_read || 0; // Default value for is_read is set to 0
    }
  }
  
  module.exports = Notification;
  