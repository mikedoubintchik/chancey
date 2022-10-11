importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyAFNUXDhCCgOZ8ZBozsfHOJnFXizrjxB68',
  authDomain: 'tune-363401.firebaseapp.com',
  databaseURL: 'https://tune-363401-default-rtdb.firebaseio.com',
  projectId: 'tune-363401',
  storageBucket: 'tune-363401.appspot.com',
  messagingSenderId: '56916722998',
  appId: '1:56916722998:web:eab8aabe27baf7dd38df97',
  measurementId: 'G-04W0XTXMJ4',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
var messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  var notificationTitle = payload.notification.title;
  var notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
