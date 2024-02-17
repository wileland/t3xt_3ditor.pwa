const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    butInstall.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;

      // Provide user feedback based on outcome
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    }
  });
});

window.addEventListener('appinstalled', (event) => {
  deferredPrompt = null;
  console.log('PWA was installed', event);
  // Show a message or call a function to celebrate the successful installation
  celebrateInstallation(); // This would be a custom function you define for post-installation UI feedback
});

// Example function to provide feedback on successful installation
function celebrateInstallation() {
  alert('Thank you for installing our app!');
  // Update the UI or notify the user in other ways here
}
