import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

import config from './config';

const app = initializeApp(config.firebase);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export const db = getFirestore(app);
export default app;

if (process.env.REACT_APP_ENV === 'development') {
  console.log('development environment');
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
