const mongoose = require('mongoose'); // Step 1: mongoose import

// Step 2: Schema define karo
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,     // validator 1: must be present
    unique: true,       // validator 2: name must be unique
    minlength: 2        // validator 3: at least 2 characters
  },
  author: {
    type: String,
    required: true      // validator: author name is required
  },
  borrowed: {
    type: Boolean,
    default: false      // by default not borrowed
  }
});

// Step 3: Schema se model banao & export karo
module.exports = mongoose.model('Book', bookSchema);
