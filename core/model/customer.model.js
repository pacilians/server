class Customer {
  constructor(
    id,
    name,
    address,
    telephone,
    email,
    expiry_date,
    business_category,
    service,
    key_person_name,
    key_person_dob,
    key_person_hp,
    created_at,
    updated_at,
    status,
    board_of_director = [],
    bank_account = [],
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
    this.email = email
    this.expiry_date = expiry_date;
    this.business_category = business_category;
    this.service = service;
    this.key_person_name = key_person_name;
    this.key_person_dob = key_person_dob;
    this.key_person_hp = key_person_hp;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.board_of_director = board_of_director;
    this.bank_account = bank_account;
    this.status = status;
    this.file = []
    this.mandatory_file = []
    this.additional_file = []
  }

  spread(data){
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.telephone = data.telephone;
    this.email = data.email;
    this.expiry_date = data.expiry_date;
    this.business_category = data.business_category;
    this.service = data.service;
    this.key_person_name = data.key_person_name;
    this.key_person_dob = data.key_person_dob;
    this.key_person_hp = data.key_person_hp;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.board_of_director = data.board_of_director || [];
    this.bank_account = data.bank_account || [];
    this.file = data.file || []
    this.status = data.status
    this.mandatory_file = data.mandatory_file || []
    this.additional_file = data.additional_file || []
  }

  addBoardOfDirector(board_of_director) {
    this.board_of_director.push(board_of_director);
  }

  addBankAccount(bank_account) {
    this.bank_account.push(bank_account);
  }
}

module.exports = Customer;
