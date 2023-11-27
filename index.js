const Server = require("./server");
const cron = require("node-cron");
const axios = require('axios');
// const config = require('./config');
const port = process.env.PORT || 8000;

// cron.schedule("*/10 * * * * *", () => {
//     try {
//         axios.get(`http://127.0.0.1:${port}/notification/routine`);
//       } catch (error) {
//         console.error('Error occurred during API call:', error.message);
//       }
// });

const server = new Server();
server.run(process.env.PORT || 8000);
