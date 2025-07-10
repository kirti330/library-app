const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2             // validator: at least 2 characters
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/     // validator: must be exactly 10 digits
  },
  borrowedBooks: [
    {
      name: String,
      author: String,
      borrowDate: {
        type: Date,
        default: Date.now
      },
      returnDate: Date
    }
  ]
});

module.exports = mongoose.model('Borrower', borrowerSchema);
