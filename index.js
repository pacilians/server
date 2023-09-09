var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express();    

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
    
app.use(cors())

// Define a route that responds with "Hello, World!"
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
  
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
