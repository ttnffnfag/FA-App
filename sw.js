const CACHE_NAME = "fa-app-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png"
];

// 安裝時：寫入快取
self.addEventListener("install", event => {
  self.skipWaiting(); // 直接跳過等待
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 啟用時：清掉舊版本快取（重點）
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // 立刻接管頁面
});

// 攔截請求：優先用快取，沒有才抓網路
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
