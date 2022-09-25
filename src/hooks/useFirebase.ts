import { Photo } from '@capacitor/camera';
import { auth, db, storage, functions } from 'config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { UserPhoto, UserRegisterMethodType, UserType } from 'types/profile';
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
import { useHistory } from 'react-router';

export function useFirebase() {
  const _getFileBlob = (url: URL, cb: Function) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.addEventListener('load', function () {
      cb(xhr.response);
    });
    xhr.send();
  };

  const readNumbersFromTicket = (photos: UserPhoto[]) => {
    console.log('reading numbers');

    // TODO: remove public access
    // https://console.cloud.google.com/functions/details/us-central1/helloWorld?env=gen1&tab=logs&project=tune-363401
    const readNumbersFromTicket = httpsCallable(functions, 'helloWorld');
    try {
      readNumbersFromTicket();
    } catch ({ code, message, details }) {
      console.error(code, message, details);
    }
  };

  const uploadToFirebaseStorage = (imageURL: Photo) => {
    const store = {
      user: 'mike',
    };
    const storageRef = ref(storage, `tickets/${store.user}/${store.user}.jpg`);

    // @ts-expect-error
    uploadBytes(storageRef, imageURL).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  // TODO: fix any
  const onAuthStateChange = (callback: any) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, uid: user.uid });
      } else {
        callback({ loggedIn: false });
      }
    });
  };

  // TODO: fix any
  const _registerUser = async (user: UserType, dispatch: Dispatch<any>) => {
    // save user to database
    await setDoc(doc(db, 'users', user.uid), { ...user });

    dispatch({
      type: ActionType.UPDATE_USER,
      user,
    });
  };

  const login = async (
    method: UserRegisterMethodType,
    dispatch: Dispatch<any>,
    // @ts-expect-error
    history: History<unknown>,
    username = null,
    password = null,
  ) => {
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

          _registerUser(user, dispatch);

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
  };

  return {
    readNumbersFromTicket,
    login,
    logout,
    onAuthStateChange,
    uploadToFirebaseStorage,
  };
}
