var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const jwt = require('express-jwt');
const uploadRecipe = require('../utilities/upload/multerRecipe');
require('dotenv').config();


router.get('/allRecipe' , jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.allMyRecipes) 
      .get('/category', controller.allRecipesByCategory)
      .get('/one/:id' , controller.getByID)
      .put('/:id' , jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),   controller.updateRecipe)
      .put('/:id/image', uploadRecipe.single('image'), jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.updateImage)
      .post('/newRecipe' , uploadRecipe.single('image'), jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.createNewRecipe)
      .delete('/:id' , jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }),  controller.deleteRecipe)
      .put('/review/:id', controller.view)
     
      

module.exports = router;