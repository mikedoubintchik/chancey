import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ActionType, useStore } from 'stores/store';
import { TicketPhotoType, UserType } from 'types/profile';
import { useFirebase } from '../hooks/useFirebase';
import { parseDate, parseMegaMillionsNumbersAndMultiplier } from 'utils/lottery-utils';
import { TicketTextType } from 'types/lottery-draw';
import config from 'utils/config';

const { FEATURE_READ_TICKET } = config;

export function usePhotoGallery() {
  const { dispatch } = useStore();
  const { readNumbersFromTicket, uploadToFirebaseStorage } = useFirebase();

  const takePhoto = async (user: UserType): Promise<void> => {
    const ticketPhoto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      presentationStyle: 'fullscreen',
    });

    if (FEATURE_READ_TICKET) {
      const fileName = `${user?.uid}-${new Date().getTime()}.jpg`;

      const newPhoto: TicketPhotoType = {
        fileName,
        filePath: `${user?.uid}/${fileName}`,
        webviewPath: ticketPhoto.webPath,
      };

      dispatch({
        type: ActionType.UPDATE_TICKET_PHOTOS,
        ticketPhoto: newPhoto,
      });

      await uploadToFirebaseStorage(newPhoto);

      const ticketText: TicketTextType | false = await readNumbersFromTicket(newPhoto.filePath);

      if (ticketText) {
        const values = parseMegaMillionsNumbersAndMultiplier(ticketText[0].description);
        const { ticketDate } = parseDate(ticketText[0].description);

        if (values) {
          dispatch({
            type: ActionType.UPDATE_LATEST_TICKET,
            values,
          });
        }

        if (ticketDate) {
          dispatch({
            type: ActionType.UPDATED_LATEST_TICKET_DATE,
            ticketDate,
          });
        }
      }
    }
  };

  return {
    takePhoto,
  };
}
