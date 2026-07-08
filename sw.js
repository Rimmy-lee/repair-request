/* 앱 설치를 가능하게 해주는 파일입니다. 수정할 필요 없어요. */
var CACHE = 'repair-app-v1';

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(['./index.html']); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html');
      })
    );
  }
});
