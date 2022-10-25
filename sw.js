const cacheName = ["CacheIt-v1"]
const urlsToCache = ["/assets/images/background.jpg"]
const self = this

self.addEventListener("install", (event) => {
    console.log("installing...")

    event.waitUntil(
        caches.open(cacheName[0]).then((cache) => {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener("fetch", (event) => {
    return
})
