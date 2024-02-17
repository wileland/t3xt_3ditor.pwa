import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname is not defined in ES6 modules, so we simulate it using new URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing application/json
app.use(express.json());

// Serve the index.html file for all other requests to support SPA- also added error handling
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Server Error');
    }
  });
});
// Start the server on the defined PORT
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));