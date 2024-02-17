import { Workbox } from 'workbox-window';
import Editor from './editor';
import '../css/style.css'; // Import styles

// Initialize the editor
const editor = new Editor();

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
        let userConsent = confirm('New content available! Would you like to update?');
        if (userConsent) {
          window.location.reload();
        }
      }
    });
  } else {
    console.error('Service workers are not supported in this browser.');
  }
}

// Call the function to register the service worker
registerServiceWorker();
