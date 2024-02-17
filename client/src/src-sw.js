import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache and route any assets from the __WB_MANIFEST variable
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200], // Cache only successful responses
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Register a route to handle navigation requests
registerRoute(
  ({ request }) => request.mode === 'navigate',
  ({ event }) => pageCache.handle({ event })
);

// Register a route to cache assets like stylesheets, scripts, and worker scripts
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200], // Cache only successful responses
      }),
      new ExpirationPlugin({
        maxEntries: 200, // Limit the number of entries in the cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        purgeOnQuotaError: true, // Handle quota errors by purging old entries
      }),
    ],
  })
);
