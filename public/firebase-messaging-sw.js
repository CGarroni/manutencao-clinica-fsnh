// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA3FrGpdN7Ja4fyiYjxgjbeqvFCrd-RYOw",
  authDomain: "manutencao-clinica-fsnh.firebaseapp.com",
  projectId: "manutencao-clinica-fsnh",
  storageBucket: "manutencao-clinica-fsnh.firebasestorage.app",
  messagingSenderId: "669634366108",
  appId: "1:669634366108:web:80440c3f2116aeb7b8bb59"
});

const messaging = firebase.messaging();

// Configuração opcional para exibir notificação customizada em background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em background recebida:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nova Notificação';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem uma nova atualização.',
    icon: '/icon-192.png', // Usa o ícone que geramos
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: payload.notification?.click_action || '/' // Link para abrir ao clicar
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Evento de clique na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});