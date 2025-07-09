const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  borrowed: { type: Boolean, default: false }
});

// Unique index on name+author
bookSchema.index({ name: 1, author: 1 }, { unique: true });

// BorrowedBook subdocument schema
const borrowedBookSchema = new mongoose.Schema({
  name: String,
  author: String,
  borrowDate: Date,
  returnDate: Date
}, { _id: false });

// Borrower Schema
const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  borrowedBooks: [borrowedBookSchema]
});

// Index on phoneNumber
borrowerSchema.index({ phoneNumber: 1 });

// Models
const Book = mongoose.model('Book', bookSchema);
const Borrower = mongoose.model('Borrower', borrowerSchema);

// Export
module.exports = { Book, Borrower };
