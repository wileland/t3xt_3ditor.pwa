import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import htmlRoutes from './htmlRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply HTML routes
htmlRoutes(app);

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'), err => {
    if (err) res.status(500).send('Server Error');
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
