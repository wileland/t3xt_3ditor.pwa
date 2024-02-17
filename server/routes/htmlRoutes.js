import path from 'path';
import { fileURLToPath } from 'url';

// __dirname is not defined in ES6 modules, so we simulate it
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the route using ES6 export syntax
export default (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};
