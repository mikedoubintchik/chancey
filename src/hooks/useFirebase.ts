import { auth, db, functions, storage } from 'config/firebase';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { ref, uploadBytes } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import { ActionType, useStore } from 'stores/store';
import { TicketPhotoType, UserRegisterMethodType, UserType } from 'types/profile';

export function useFirebase() {
  const { dispatch } = useStore();
  const history = useHistory();

  const readNumbersFromTicket = async (fileName: TicketPhotoType['filePath']) => {
    console.log('reading numbers');

    // TODO: remove public access
    // https://console.cloud.google.com/functions/details/us-central1/helloWorld?env=gen1&tab=logs&project=tune-363401
    try {
      const { data } = await httpsCallable(functions, 'getTextFromTicket')({ fileName });
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

    uploadBytes(storageRef, ticketBlob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  // TODO: fix any
  const registerUser = async (user: UserType) => {
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

          registerUser(user);

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

  const getHistoricalData = async () => {
    const colRef = collection(db, 'historicalData');
    const result = await getDocs(colRef);
    // TODO: fix any
    const historicalData: any = [];
    result.forEach((ticket) =>
      historicalData.push({
        [ticket.id]: ticket.data(),
      }),
    );
    return historicalData;
  };

  return {
    getHistoricalData,
    readNumbersFromTicket,
    login,
    logout,
    uploadToFirebaseStorage,
  };
}
