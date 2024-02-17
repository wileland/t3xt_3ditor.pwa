import { Workbox } from 'workbox-window';
import Editor from './editor';
import '../css/style.css'; // Import styles

// Function to register the service worker
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const workboxSW = new Workbox('/service-worker.js');

    try {
      await workboxSW.register();
      console.log('Service worker registered successfully');
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }

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
}

// Event listener for DOMContentLoaded to initialize the editor
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the editor
  const editor = new Editor();
});

// Call the function to register the service worker
registerServiceWorker();
