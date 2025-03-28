importScripts('/firebase-messaging-sw-config.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDxGxGxGxGxGxGxGxGxGxGxGxGxGxGxGxGx',
  authDomain: 'perintis.firebaseapp.com',
  projectId: 'perintis',
  storageBucket: 'perintis.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef1234567890'
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: payload.data,
    actions: payload.data.actions || [],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); 