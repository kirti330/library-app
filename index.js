const mongoose = require('mongoose');

// Connect to local MongoDB 'library' database
mongoose.connect('mongodb://127.0.0.1:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB successfully!');

  // Optional test: count number of books
  const count = await Book.countDocuments();
  console.log('Total books in DB:', count);

  // Also: show all borrowers
  const borrowers = await Borrower.find({});
  console.log('All Borrowers:', borrowers);
})
.catch(err => console.error('❌ Connection failed:', err));

// Keep process running
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});

// Import models
const Book = require('./models/books');
const Borrower = require('./models/borrower');
