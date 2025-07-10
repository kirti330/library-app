const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,          // validator: name must be unique
    minlength: 2           // validator: at least 2 characters
  },
  author: {
    type: String,
    required: true
  },
  borrowed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookSchema);
