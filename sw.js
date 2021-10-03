// Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_vidartit_pwa';

// Ficheros a cachear en la aplicación
var urlsToCache = [
     './',
     './css/styles.css',
     './img/logo_vidartit.png',
     './img/1.png',
     './img/2.png',
     './img/3.png',
     './img/4.png',
     './img/5.png',
     './img/6.png',
     './img/facebook.png',
     './img/instagram.png',
     './img/twitter.png',
     './img/vidarticon-1024.png',
     './img/vidarticon-512.png',
     './img/vidarticon-384.png',
     './img/vidarticon-256.png',
     './img/vidarticon-192.png',
     './img/vidarticon-128.png',
     './img/vidarticon-96.png',
     './img/vidarticon-64.png',
     './img/vidarticon-32.png',
     './img/vidarticon-16.png',
];

// Evento install
// instalación del service worker y guardar en cche los recursos estáticos de la aplicación
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                        });    
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

// Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheName =>{
                return Promise.all(
                    cacheName.map(cacheName => {

                        if(cacheWhitelist.indexOf(cacheName) === -1 ){
                            // Borrar elementos que no se necesitan
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Activar cache
                self.clients.claim();
            })
    );
});

// Evento fetch
self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    // devuelvo datos desde cache
                    return res;
                }

                return fetch(e.request);
            })
    );
});