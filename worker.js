// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('delta-cache').then((cache) => {
            return cache.addAll([
                '/',            // Cache the root HTML file
                '/index.html',  // Cache the main HTML file
                '/manifest.json',  // Cache the manifest file (if needed)
                // You can add any other files you want to cache (e.g., CSS, JS, images)
            ]);
        })
    );
});

// Fetch event to serve cached files when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // If the resource is cached, return it. If not, fetch it from the network.
            return cachedResponse || fetch(event.request);
        })
    );
});
