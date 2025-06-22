-- create table
DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review TEXT,
  read_date DATE,
  cover_id TEXT
);

-- data
INSERT INTO books (title, author, rating, review, read_date, cover_id)
VALUES (
  'Harry Potter and the Philosopher''s Stone',
  'J.K. Rowling',
  5,
  'A magical and nostalgic start to the wizarding world.',
  '2023-06-10',
  '8167896'
);
