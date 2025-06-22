import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// Utility function for sorting
const getSortQuery = (sort) => {
  switch (sort) {
    case 'title_asc':
      return 'ORDER BY title ASC';
    case 'title_desc':
      return 'ORDER BY title DESC';
    case 'rating_high':
      return 'ORDER BY rating DESC';
    case 'rating_low':
      return 'ORDER BY rating ASC';
    case 'recent':
      return 'ORDER BY read_date DESC';
    default:
      return '';
  }
};

// GET / — homepage with optional search & sort
router.get('/', async (req, res) => {
  const { search = '', sort = '' } = req.query;
  let query = 'SELECT * FROM books';
  const values = [];

  if (search) {
    query += ' WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $1';
    values.push(`%${search.toLowerCase()}%`);
  }

  query += ` ${getSortQuery(sort)}`;

  try {
    const result = await db.query(query, values);
    res.render('index', { books: result.rows, search });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching books');
  }
});

// GET /add — show add form
router.get('/add', (req, res) => {
  res.render('add');
});

// POST /add — create a book
router.post('/add', async (req, res) => {
  const { title, author, rating, review, read_date, cover_id, status } = req.body;
  try {
    await db.query(
      'INSERT INTO books (title, author, rating, review, read_date, cover_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [title, author, rating, review, read_date, cover_id, status]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding book');
  }
});

// GET /edit/:id — show edit form
router.get('/edit/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
    if (result.rows.length === 0) return res.status(404).send('Book not found');
    res.render('edit', { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching book for edit');
  }
});

// POST /update/:id — update book
router.post('/update/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating, review, read_date, cover_id, status } = req.body;
  try {
    await db.query(
      'UPDATE books SET title=$1, author=$2, rating=$3, review=$4, read_date=$5, cover_id=$6, status=$7 WHERE id=$8',
      [title, author, rating, review, read_date, cover_id, status, bookId]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating book');
  }
});

// POST /delete/:id — delete book
router.post('/delete/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    await db.query('DELETE FROM books WHERE id = $1', [bookId]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting book');
  }
});

export default router;
