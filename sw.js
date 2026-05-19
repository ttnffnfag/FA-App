self.addEventListener("install", e=>{
e.waitUntil(
caches.open("fa-cache").then(cache=>{
return cache.addAll([
"app.html",
"manifest.json",
"icon.png"
]);
})
);
});

self.addEventListener("fetch", e=>{
e.respondWith(
caches.match(e.request).then(r=>{
return r || fetch(e.request);
})
);
});