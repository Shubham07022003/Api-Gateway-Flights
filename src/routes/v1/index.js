const express =require("express");
const userRoutes = require('./user-routes')
const {infocontroller} = require('../../controllers')
const {AuthRequestMiddlewares}= require('../../middlewares')

const router = express.Router();
router.get('/info',AuthRequestMiddlewares.checkAuth , infocontroller.info);

router.get('/', (req, res) => {
        res.json({ message: 'API is working' });
    });
// POST: /api/v1/user/signup
    router.use('/user', userRoutes);
module.exports =router;   

