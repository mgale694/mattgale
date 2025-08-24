/**
 * Service Worker for performance optimization
 * Professional website caching for Matthew Gale's portfolio
 */

const CACHE_NAME = 'mattgale-portfolio-v1';
const urlsToCache = [
  '/',
  '/about',
  '/blog',
  '/showcase'
];

// Install event - cache essential pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.warn('Cache installation failed:', error);
      })
  );
});

// Fetch event - serve from cache when available
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.warn('Fetch failed:', error);
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
