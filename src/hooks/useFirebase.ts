import { Photo } from '@capacitor/camera';
import { auth, db, storage, functions } from 'config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { UserRegisterMethodType, UserType, TicketPhotoType } from 'types/profile';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { ActionType, useStore } from 'store';
import { getFirestore, addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { Dispatch } from 'react';
import { useHistory } from 'react-router-dom';

export function useFirebase() {
  const { dispatch } = useStore();
  const history = useHistory();

  const readNumbersFromTicket = async (fileName: TicketPhotoType['filePath']) => {
    console.log('reading numbers');

    // TODO: remove public access
    // https://console.cloud.google.com/functions/details/us-central1/helloWorld?env=gen1&tab=logs&project=tune-363401
    try {
      const { data } = await httpsCallable(functions, 'getTextFromTicket')({ fileName });
      console.log('🚀 ~ file: useFirebase.ts ~ line 31 ~ readNumbersFromTicket ~ ticketText', data);
      dispatch({
        type: ActionType.UPDATE_TICKET_PHOTOS_TEXT,
        ticketText: data,
      });
    } catch ({ code, message, details }) {
      console.error(code, message, details);
    }
  };

  // TODO: add return type on function
  const uploadToFirebaseStorage = async (ticketPhoto: TicketPhotoType) => {
    if (!ticketPhoto?.webviewPath) return;

    const storageRef = ref(storage, `tickets/${ticketPhoto.filePath}.jpg`);

    const ticketBlob = await fetch(ticketPhoto?.webviewPath).then((r) => r.blob());

    // // @ts-expect-error
    uploadBytes(storageRef, ticketBlob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  // TODO: fix any
  const _registerUser = async (user: UserType) => {
    // save user to database
    // TODO: we no longer have permissions to do this
    await setDoc(doc(db, 'users', user.uid), { ...user });

    dispatch({
      type: ActionType.UPDATE_USER,
      user,
    });
  };

  const login = async (method: UserRegisterMethodType, username = null, password = null) => {
    let response = null;

    if (username && password) {
      try {
        response = await signInWithEmailAndPassword(auth, username, password);
        // TODO: fix any
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
      }
    } else {
      try {
        const provider =
          method === UserRegisterMethodType.google ? new GoogleAuthProvider() : new FacebookAuthProvider();

        response = await signInWithPopup(auth, provider);

        const {
          providerId,
          user: { uid, photoURL, displayName, email },
        } = response;

        // only register user if we get all necessary data
        if (email && providerId) {
          const user = {
            uid,
            photoURL,
            displayName,
            email,
            providerId,
          };

          _registerUser(user);

          // redirect to profile page upon successful login
          history.push(`/home`);
        }

        // TODO: fix any
      } catch (error: any) {
        console.log(error);

        throw new Error(error.message);
      }
    }

    return response;
  };

  const logout = () => {
    auth.signOut();

    // reset global state
    dispatch({
      type: ActionType.RESET,
    });

    // redirect to profile page upon successful logout
    history.push(`/home`);
  };

  return {
    readNumbersFromTicket,
    login,
    logout,
    onAuthStateChange,
    uploadToFirebaseStorage,
  };
}
