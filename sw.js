//remember to increment the version # when you update the service worker
const version = "3.00",
    preCache = "PRECACHE-" + version,
    cacheList = [ "/" ];

/*
create a list (array) of urls to pre-cache for your application
*/

/*  Service Worker Event Handlers */

self.addEventListener("install", function (event) {

    //only use if you are 100% sure it wont break your application UX
    self.skipWaiting();
    
    event.waitUntil(
      //pre-cache
      //on install as a dependency
      caches.open(preCacheName).then(function (cache) {
        //won't delay install completing and won't cause installation to
        //fail if caching fails.
        //the difference is as dependency returns a Promise, the
        //no dependency does not.
        //on install not as dependency (lazy-load)
        console.log("caches add as no-dependency");
  
        cache.addAll(precache_no_dependency_urls);
  
        console.log("caches add as dependency");
  
        return cache.addAll(precache_urls);
      })
    );
  });

self.addEventListener("activate", function (event) {

    event.waitUntil(
  
      caches.keys().then(cacheNames => {
        cacheNames.forEach(value => {

          if (value.indexOf(version) < 0) {
            caches.delete(value);
          }

        });
  
        console.log("service worker activated");
  
        return;

      })
      
    );
  
  });

self.addEventListener( "fetch", function ( event ) {

    event.respondWith(

        fetch( event.request )

        /* check the cache first, then hit the network */
        /*
                caches.match( event.request )
                .then( function ( response ) {

                    if ( response ) {
                        return response;
                    }

                    return fetch( event.request );
                } )
        */
    );

} );