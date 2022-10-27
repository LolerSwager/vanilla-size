const cacheName = ["StaticCache", "autoCache"]
const staticUrlsToCache = [
    "/assets/icons/favicon.ico",
    "/assets/icons/manifest-icon-192.maskable.png",
    "/assets/icons/manifest-icon-512.maskable.png",
    "/assets/images/background.jpg",
    "/assets/css/style.css",
    
]
const self = this

self.addEventListener("install", (event) => {
    console.log("[Service Worker] installing...")

    event.waitUntil(
        caches.open(cacheName[0]).then((cache) => {
            return cache.addAll(staticUrlsToCache)
        })
    )
})

/* self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Handling fetch event for", event.request.url)

    event.respondWith(
        caches.open(
            cacheAllowList[0].then((cache) => {
                console.log("[Service Worker]")
                return cache.match(event.request)
            })
        )
    )
}) */

self.addEventListener("fetch", async (event) => {
    // Is this a request for an image?
    if (event.request.destination === "image") {
        // Open the cache
        event.respondWith(
            caches.open(cacheName[1]).then((cache) => {
                // Respond with the image from the cache or from the network
                return caches.match(event.request).then((cachedResponse) => {
                    return (
                        cachedResponse ||
                        fetch(event.request.url).then((fetchedResponse) => {
                            console.log(
                                `[Service Worker] Handling fetch event for ${event.request.url}`
                            )
                            // Add the network response to the cache for future visits.
                            // Note: we need to make a copy of the response to save it in
                            // the cache and use the original as the request response.
                            cache.put(event.request, fetchedResponse.clone())
                            // Return the network response
                            return fetchedResponse
                        })
                    )
                })
            })
        )
    } else {
        return
    }
})