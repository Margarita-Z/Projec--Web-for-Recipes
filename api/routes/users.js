var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');
const jwt = require('express-jwt');
const uploadUser = require('../utilities/upload/multerUser');
require('dotenv').config();


router
      .post('/register', controller.register)
      .post('/login', controller.login)
      .post('/logout',jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.logout)
      .get('/' ,jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.MyProfile)
      .put('/update' , jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.updataMyProfile)
      .put('/image' , uploadUser.single('image'), jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),  controller.updataMyImage)
      

module.exports = router;
