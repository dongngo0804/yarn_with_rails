function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const applicationServerPublicKey = 'BHZR3bDH4cW1iN3lquEMT8VxNB0h6Kp_umVF4KSBrOePLO9N4iXLBbOTa9V3bh953kZXIyd08QOZJyNjWCxjaxg';
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
    .then(function(reg) {
      console.log('[Companion]', 'Service worker registered!');
      reg.pushManager.subscribe({ 
      	userVisibleOnly: true,
  		applicationServerKey: applicationServerKey 
  	   }).then(function(subscription) {
            console.log('endpoint:', JSON.stringify(subscription));
        });
    });
}
