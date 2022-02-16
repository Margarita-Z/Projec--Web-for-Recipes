const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type : String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
 
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)