import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken } from 'firebase/messaging';

import config from './config';

import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { Capacitor } from '@capacitor/core';

const app = initializeApp(config.firebase);

if (process.env.REACT_APP_ENV === 'development') {
  console.log('development environment');

  // use debug token for app check
  (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY as any),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
const resolveAuth = () => {
  if (Capacitor.isNativePlatform()) {
    return initializeAuth(app);
  } else return getAuth(app);
};
export const auth = resolveAuth();

export const storage = getStorage(app);
export const functions = getFunctions(app);
export const db = getFirestore(app);
// export const messaging = getMessaging(app);

// // https://github.com/firebase/quickstart-js/tree/master/messaging
// getToken(messaging, {
//   vapidKey: 'BF8ZjTBlMtnraYDgmfD5L4v9SX88fT2WOEA1Md9DGQ4bB7CrgEGIkW03Uzk7cFqfEstE-Y-5Ei5AHYJsBz6dIo8',
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log('Push Notification Token', currentToken);
//       // TODO: send token to future backend service that will be sending out push notifications
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // Show permission UI.
//     }
//   })
//   .catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//   });

export default app;

if (process.env.REACT_APP_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
