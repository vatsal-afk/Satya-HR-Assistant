const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    lowercase: true,
     
  },
  mobile_no: {
    type: Number,
  },
  
  
});

let User = mongoose.model('User', userSchema);

module.exports = User;