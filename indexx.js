const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON bodies

// Array to store books
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby (Updated)" },       // missing author
  { id: 3, title: "The Alchemist (Updated)", author: "Paulo Coelho" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho" }
];
let nextId = 6; // since your highest ID is 5


// GET /books - return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author required" });
  }
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// *PUT /books/:id - update a book by ID*
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id - delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: "Book deleted", book: deletedBook[0] });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});