const { plainToClass } = require("class-transformer");
const { UserDTO } = require("../../core/dto/user.dto");
const JsonResponse = require("../../core/response");
const { userService } = require("../service");

const UserController = {
  async createUser(req, res) {
    const user = plainToClass(UserDTO, req.body);
    const createdUser = await userService.createUser(user);
    const response = new JsonResponse(
      200,
      { user: createdUser },
      "Success creating user"
    );

    if (!createdUser) {
      response.message = "Failed creating user (double email)";
      response.status = 500;
    }
    response.send(res);
  },

  async updateUser(req, res) {
    const id = req.params.id;
    const user = plainToClass(UserDTO, req.body);
    const updatedUser = await userService.updateUser(id, user);
    const response = new JsonResponse(
      200,
      { user: updatedUser },
      "Successfull updated user"
    );
    response.send(res);
  },

  async getDetailUser(req, res) {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    const response = new JsonResponse(200, {}, "");

    if (!user) {
      response.message = "User not found";
      response.status = 404;
    } else {
      response.data = { user };
    }

    if (user === null) {
      response.message = "Internal server error";
      response.status = 500;
    }

    response.send(res);
  },

  async getAllUser(req, res) {
    const users = await userService.getAllUser();
    const response = new JsonResponse(200, { users: users }, "");
    response.send(res);
  },
  async deleteUser(req, res) {
    const id = req.params.id;
    await userService.deleteUser(id);
    const response = new JsonResponse(200, {}, "User has been deleted");
    response.send(res);
  },
};

module.exports = UserController;

