import { getDb, putDb } from './database.js';
import { header } from './header.js';
import CodeMirror from 'codemirror';
import 'codemirror/theme/monokai.css'; // Import the Monokai theme

export default class Editor {
  constructor() {
    this.init();
  }

  async init() {
    // Initialize CodeMirror with the editor settings
    this.editor = new CodeMirror(document.querySelector('#main'), {
      value: header, // Start with predefined header content
      mode: 'javascript', // Set syntax highlighting for JavaScript
      theme: 'monokai', // Use Monokai theme for the editor
      lineNumbers: true, // Display line numbers
      lineWrapping: true, // Wrap lines that are too long
      autofocus: true, // Focus the editor on page load
      indentUnit: 2, // Set indentation units to 2 spaces
      tabSize: 2, // Set tab size to 2 spaces
    });

    try {
      const data = await getDb();
      // Load the most recent entry into the editor
      if (data?.length) {
        this.editor.setValue(data[data.length - 1]?.value || '');
      }
    } catch (error) {
      console.error('Failed to load data into the editor:', error);
    }

    // Save changes to the database, debouncing to reduce frequency
    this.editor.on('change', this.debounce(() => {
      const content = this.editor.getValue();
      putDb({content}); // Ensure the structure matches your DB expectations
    }, 500));
  }

  // Debounce method to limit the rate at which a function is executed
  debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), timeout);
    };
  }
}
