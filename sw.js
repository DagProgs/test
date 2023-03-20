  self.addEventListener("message", function(event) {
    if (event.data && event.data.type === "SKIP_WAITING") {
        skipWaiting();
    }
});