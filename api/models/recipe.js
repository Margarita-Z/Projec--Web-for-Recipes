const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortRecipe: {
    type: String,
    required: true
  },
  category: {
    type: String,
    //enum: ['Brackfast','Brunch','Lunch','Diner'],
    required: true,
  },
  time: {
    type: Number,
    required: true
  },
  noPeople: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  review: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  image: {
    type: String
  }
  
}, { timestamps: true });

module.exports = mongoose.model('recipe', recipeSchema)