if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then((registeration) => {
        console.log("sw registered")
    }).catch(error => {
        console.log("sw failed error => \n" . error)
    })
} else {
    alert("ServiceWorker not supported ont this browser change browser")
}