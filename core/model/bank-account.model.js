class BankAccount {
  constructor(id, id_customer, number, name) {
    this.id = id;
    this.id_customer = id_customer;
    this.number = number;
    this.name = name;
  }

  spread(data) {
    this.id = data.id;
    this.id_customer = data.id_customer;
    this.number = data.number;
    this.name = data.name;
  }
}

module.exports = BankAccount;
