const UserRepository = require("../repository/userRepository");

const UserService = {
  async createUser(user) {
    return await UserRepository.createUser(user);
  },
  async getUserById(id) {
    return await UserRepository.getUserById(id);
  },
  async updateUser(id, user) {
    await UserRepository.updateUser(id, user);
  },
  async deleteUser(id) {
    await UserRepository.deleteUser(id);
  },
  async getUserByEmail(email){
    const user = await UserRepository.getUserByEmail(email)
    return user;
  }
};

module.exports = UserService;
