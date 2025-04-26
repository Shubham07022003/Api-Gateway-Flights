const express =require("express");
const {infocontroller} = require('../../controllers')
const router = express.Router();
router.get('/info', infocontroller.info);

router.get('/', (req, res) => {
        res.json({ message: 'API is working' });
    });
module.exports =router;

