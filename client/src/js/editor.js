import { getDb, putDb } from './database';
import { header } from './header';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript'; // Import JavaScript mode if needed
import 'codemirror/theme/monokai.css'; // Import the theme if needed

export default class Editor {
  constructor() {
    this.init();
  }

  async init() {
    this.editor = new CodeMirror(document.querySelector('#main'), {
      value: header,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    const data = await getDb();
    if (data?.length) {
      this.editor.setValue(data[data.length - 1]?.value || '');
    }

    this.editor.on('change', this.debounce(() => {
      const content = this.editor.getValue();
      putDb(content);
    }, 500));
  }

  debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}
