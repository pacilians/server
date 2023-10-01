class UserDTO {
  constructor(
    id,
    email,
    password,
    name,
    photo,
    npp,
    role,
    description,
    is_notify
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.photo = photo;
    this.npp = npp;
    this.role = role;
    this.description = description;
    this.is_notify = is_notify;
  }
}

module.exports = {
  UserDTO,
};
