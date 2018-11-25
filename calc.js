// Registra o service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./pwa-worker.js')
    .then(function() { 
        console.log('Service Worker Registered'); 
    }, function(error){
        console.error(error);
    });
}