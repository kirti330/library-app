// public/script.js

// Load all books when page loads
loadBooks();

async function loadBooks() {
  try {
    const res = await fetch('/books');
    const books = await res.json();
    const phoneNumber = localStorage.getItem('phoneNumber');

    let html = '<h3>All Books</h3>';
    books.forEach(book => {
      html += `<p>
        <strong>${book.name}</strong> by ${book.author} 
        ${book.borrowed ? 
          `<button disabled>Borrowed</button>` 
          : `<button onclick="borrow('${book._id}')">Borrow</button>`}
        <button onclick="returnBook('${book._id}')">Return</button>
      </p>`;
    });
    document.getElementById('books').innerHTML = html;
  } catch (err) {
    console.error('Error loading books:', err);
  }
}

async function borrow(bookId) {
  const phoneNumber = localStorage.getItem('phoneNumber');
  if (!phoneNumber) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }
  try {
    const res = await fetch(`/borrow/${bookId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Book borrowed!');
      loadBooks();
    } else {
      alert('Error: ' + data.error);
    }
  } catch (err) {
    console.error('Error borrowing:', err);
  }
}

async function returnBook(bookId) {
  const phoneNumber = localStorage.getItem('phoneNumber');
  if (!phoneNumber) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }
  try {
    const res = await fetch(`/return/${bookId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Book returned!');
      loadBooks();
    } else {
      alert('Error: ' + data.error);
    }
  } catch (err) {
    console.error('Error returning:', err);
  }
}
