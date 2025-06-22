import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import booksRouter from './routes/books.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Use book routes
app.use('/', booksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
