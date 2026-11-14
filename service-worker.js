self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(clients.claim()); });
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data.json(); } catch (e) { data = { title: 'Nova', body: 'Новое уведомление' }; }
  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192.png',
    badge: '/badge.png',
    tag: data.tag || 'nova',
    requireInteraction: data.requireInteraction || false,
    data: { url: data.url || '/' }
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Nova', options));
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.openWindow(url));
});