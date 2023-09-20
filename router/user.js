const express = require('express');
const { container } = require('../container')
const router = express.Router();

// const userController = container.resolve('usr');
console.log(container)

router.get('/', (req, res)=>{
    return res.send("Hello")
});

// router.get('/id', userController.getUser);

module.exports = router;