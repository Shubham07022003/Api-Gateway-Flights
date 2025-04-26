const express = require('express');
const v1routes = require("./v1");
const router = express.Router();


router.get('/', (req, res) => {
    res.json({ message: 'this is v1 rout' });
});

router.use('/v1', v1routes);
module.exports = router;
