import { Photo } from '@capacitor/camera';
import { auth, storage, functions } from 'config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { UserPhoto } from 'types/profile';

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

  return {
    readNumbersFromTicket,
    onAuthStateChange,
    uploadToFirebaseStorage,
  };
}
