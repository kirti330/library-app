const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  borrowedBooks: [{
    name: String,
    author: String,
    borrowDate: Date,
    returnDate: Date
  }]
});
module.exports = mongoose.model('Borrower', borrowerSchema);
