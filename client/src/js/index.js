import { Workbox } from 'workbox-window';
import Editor from './editor';
import '../css/style.css'; // Import styles

// Initialize the editor
const editor = new Editor();

// Register the service worker if supported
if ('serviceWorker' in navigator) {
  const workboxSW = new Workbox('/service-worker.js');

  workboxSW.register()
    .then(() => console.log('Service worker registered successfully'))
    .catch((error) => console.error('Service worker registration failed:', error));

  workboxSW.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      if (confirm('New content available! Would you like to update?')) {
        window.location.reload();
      }
    }
  });
} else {
  console.error('Service workers are not supported in this browser.');
}
