class UserController {
    // constructor({ userService }) {
    //   this.userService = userService;
    // }
  
    getUser(req, res) {
      // const users = this.userService.getAllUsers();
      res.json("Hello World");
    }
}

module.exports = UserController
  