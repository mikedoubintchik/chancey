import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { useFirebase } from '../hooks/useFirebase';
import { TicketPhotoType, UserType } from 'types/profile';
import { useStore } from 'stores/store';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<TicketPhotoType[]>([]);
  const { uploadToFirebaseStorage } = useFirebase();

  const takePhoto = async (user: UserType) => {
    const ticketPhoto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = `${user?.uid}-${new Date().getTime()}`;

    const newPhoto: TicketPhotoType = {
      fileName: fileName,
      filePath: `${user?.uid}/${fileName}`,
      webviewPath: ticketPhoto.webPath,
    };

    const newPhotos = [newPhoto, ...photos];

    setPhotos(newPhotos);

    uploadToFirebaseStorage(newPhoto);
  };

  return {
    photos,
    takePhoto,
  };
}
