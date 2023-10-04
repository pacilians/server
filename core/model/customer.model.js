class Customer {
  constructor(id, name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
    this.expiry_date = expiry_date;
    this.business_category = business_category;
    this.service = service;
    this.key_person_name = key_person_name;
    this.key_person_dob = key_person_dob;
    this.key_person_hp = key_person_hp;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = Customer