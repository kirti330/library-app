const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // serve frontend

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library')
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch(err => console.error('❌ Connection failed:', err));

// Import models
const Book = require('./models/book');
const Borrower = require('./models/borrower');

// GET all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET all borrowers
app.get('/borrowers', async (req, res) => {
  const borrowers = await Borrower.find();
  res.json(borrowers);
});

// REGISTER new user
app.post('/register', async (req, res) => {
  try {
    const newUser = new Borrower(req.body);
    await newUser.save();
    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN (check by phone)
app.post('/login', async (req, res) => {
  const user = await Borrower.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) res.json({ message: 'Login success', user });
  else res.status(404).json({ error: 'User not found' });
});

// BORROW book
app.post('/borrow/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (book.borrowed) return res.status(400).json({ error: 'Already borrowed' });
    book.borrowed = true;
    await book.save();

    const borrower = await Borrower.findOne({ phoneNumber: req.body.phoneNumber });
    borrower.borrowedBooks.push({
      name: book.name,
      author: book.author,
      borrowDate: new Date()
    });
    await borrower.save();

    res.json({ message: 'Book borrowed' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// RETURN book
app.post('/return/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    book.borrowed = false;
    await book.save();

    const borrower = await Borrower.findOne({ phoneNumber: req.body.phoneNumber });
    const b = borrower.borrowedBooks.find(b => b.name === book.name && !b.returnDate);
    b.returnDate = new Date();
    await borrower.save();

    res.json({ message: 'Book returned' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
