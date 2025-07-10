const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,               // validator 1
    minlength: 3
  },
  phoneNumber: {
    type: String,
    required: true,               // validator 2
    match: /^[0-9]{10}$/          // validator 3 → must be 10 digits
  },
  borrowedBooks: [{
    name: String,
    author: String,
    borrowDate: Date,
    returnDate: Date
  }]
});

module.exports = mongoose.model('Borrower', borrowerSchema);
