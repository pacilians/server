class BoardOfDirector {
  constructor(id, id_customer, name, npp, role, description, photo) {
    this.id = id;
    this.id_customer = id_customer;
    this.name = name;
    this.npp = npp;
    this.role = role;
    this.description = description;
    this.photo = photo;
  }

  spread(data) {
    this.id = data.id;
    this.id_customer = data.id_customer;
    this.name = data.name;
    this.npp = data.npp;
    this.role = data.role;
    this.description = data.description;
    this.photo = data.photo;
  }
}
module.exports = BoardOfDirector;
