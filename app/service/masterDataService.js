const {userRepository} = require("../repository");

const MasterDataService = {
  async createUser(user) {
    return await userRepository.createUser(user);
  },
  async getUserById(id) {
    return await userRepository.getUserById(id);
  },
  async updateUser(id, user) {
    await userRepository.updateUser(id, user);
  },
  async deleteUser(id) {
    await userRepository.deleteUser(id);
  },
  async getUserByEmail(email){
    const user = await userRepository.getUserByEmail(email)
    return user;
  },
  async getAllUser(){
    const users = await userRepository.getAllUsers()
    return users;
  }
};

module.exports = MasterDataService;
