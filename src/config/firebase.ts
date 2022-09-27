import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

import config from './config';
const { initializeAppCheck, ReCaptchaV3Provider } = require('firebase/app-check');

if (process.env.REACT_APP_ENV === 'development') {
  console.log('development environment');

  // use debug token for app check
  (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const app = initializeApp(config.firebase);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export const db = getFirestore(app);
export default app;

if (process.env.REACT_APP_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
