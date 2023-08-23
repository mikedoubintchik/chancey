import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getMessaging, Messaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';
import config from './config';

const app = initializeApp(config.firebase);

if (process.env.REACT_APP_ENV === 'development') {
  console.log('development environment');

  // use debug token for app check
  (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
config.firebase.FEATURE_FIREBASE_APP_CHECK &&
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY as any),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });

const resolveAuth = () => {
  if (Capacitor.isNativePlatform()) return initializeAuth(app);
  else return getAuth(app);
};

export const auth = resolveAuth();
export const storage = getStorage(app);
export const functions = getFunctions(app);
export const db = getFirestore(app);
export const messaging: Messaging | null = Capacitor.getPlatform() === 'web' ? getMessaging(app) : null;
export default app;

if (process.env.REACT_APP_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
  if (process.env.REACT_APP_FIREBASE_DEBUG === 'true') setLogLevel('debug'); // for firestore debugging
}
