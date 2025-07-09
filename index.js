const mongoose = require('mongoose');

// Connect to local MongoDB 'library' database
mongoose.connect('mongodb://127.0.0.1:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB successfully!'))
.catch(err => console.error('❌ Connection failed:', err));

// Keep process running
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});

// Import models
const { Book, Borrower } = require('./models');

// Optional test: count number of books
Book.countDocuments().then(count => {
  console.log('Total books in DB:', count);
});

