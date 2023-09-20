class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  getUser(id) {
    return this.userRepository.getUser(id);
  }
}

module.exports = UserService;
