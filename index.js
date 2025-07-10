const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Import models FIRST (correct filenames)
const Book = require('./models/book');         // models/book.js
const Borrower = require('./models/borrower'); // models/borrower.js

// Middleware: parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library')
  .then(async () => {
    console.log('✅ Connected to MongoDB successfully!');

    // Optional test: count number of books
    const count = await Book.countDocuments();
    console.log('Total books in DB:', count);

    // Optional: show all borrowers
    const borrowers = await Borrower.find({});
    console.log('All Borrowers:', borrowers);
  })
  .catch(err => console.error('❌ Connection failed:', err));

// Routes
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.get('/borrowers', async (req, res) => {
  try {
    const borrowers = await Borrower.find();
    res.json(borrowers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch borrowers' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Close DB connection gracefully on app termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});
