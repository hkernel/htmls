
var cacheName = 'js13kPWA-v1';


self.addEventListener('install', function(e){
	console.log('[service worker] install');
	e.waitUntil(caches.open(cacheName).then( function(c){
		console.log("[service worker] cache opened successfully");
	}));
});
 
self.addEventListener('fetch', function(e) {
	  e.respondWith(
	    caches.match(e.request).then(function(r) {
	          console.log('[Service Worker] Fetching resource: '+e.request.url);
	      return r || fetch(e.request).then(function(response) {
	                return caches.open(cacheName).then(function(cache) {
	                		console.log('[Service Worker] Caching new resource: '+e.request.url);
	                		cache.put(e.request, response.clone());
	                		return response;
	        });
	      });
	    })
	  );
	});