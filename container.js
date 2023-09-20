const awilix = require('awilix');

// User Domain
const userController = require('./app/controller/userController');
const userService = require('./app/service/userService');
const userRepository = require('./app/repository/userRepository');


const db = require('./core/database');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

/**
 * Depedency Injection Setup
 */
function setup() {
  container.register({

    // Controller
    usr: awilix.asClass(userController),

    // Services
    // userController: awilix.asClass(userController),

    // 
    // userRepository: awilix.asClass(userRepository),


    // Database
    db: awilix.asValue(db),
  });
}

module.exports = {
  container,
  setup,
};