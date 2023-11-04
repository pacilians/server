/**
 * Only used for approval
 */

class CustomerComment {
    constructor(id, id_customer, comment, created_at) {
      this.id = id;
      this.id_customer = id_customer;
      this.comment = comment;
      this.created_at = created_at
    }
  
    spread(data) {
      this.id = data.id;
      this.id_customer = data.id_customer;
      this.comment = data.comment;
      this.created_at = data.created_at
    }
  }
  module.exports = CustomerComment;
  