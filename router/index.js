const express = require('express');

const userRouter = require('./user');

const router = express.Router();

router.get('/', (req, res)=>{
    return res.send("Server Is Healty")
});

router.use('/user', userRouter);

module.exports = router;