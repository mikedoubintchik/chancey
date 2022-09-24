import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { useFirebase } from '../hooks/useFirebase';
import { UserPhoto } from 'types/profile';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const { uploadToFirebaseStorage } = useFirebase();

  const takePhoto = async () => {
    const ticketPhoto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // TODO: get this from global state for logged in user
    const user = 'meow';

    const fileName = `${user}-${new Date().getTime()}`;

    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: ticketPhoto.webPath,
      },
      ...photos,
    ];

    setPhotos(newPhotos);

    uploadToFirebaseStorage(ticketPhoto);
  };

  return {
    photos,
    takePhoto,
  };
}
