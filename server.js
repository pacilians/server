const express = require('express');
const { setup } = require('./container');
const apiErrorHandler = require('./core/error/api-error-handler');
const cors = require('cors')
const router = require('./router');

setup();

class Server {
  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.app.use(express.json());
    this.app.use('/',router)
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors())
    this.app.use('/', router);
    this.app.use(apiErrorHandler);
  }

  run(port) {
    this.server = this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }

  stop(done) {
    this.server.close(done);
  }
}

module.exports = Server;