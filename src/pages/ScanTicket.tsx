import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from 'components/ExploreContainer';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import { useFirebase } from 'hooks/useFirebase';
import { usePhotoGallery } from 'hooks/usePhotoGallery';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { ActionType, useStore } from 'stores/store';

const ScanTicket: React.FC = () => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: ScanTicket.tsx ~ line 21 ~ state', state);
  const { photos, takePhoto } = usePhotoGallery();
  const { readNumbersFromTicket } = useFirebase();

  useEffect(() => {
    dispatch({
      type: ActionType.UPDATE_TICKET_PHOTOS,
      ticketPhotos: photos,
    });
  }, [dispatch, photos]);

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Scan Ticket</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonButton
            onClick={async () => readNumbersFromTicket(state.ticketPhotos[state.ticketPhotos.length - 1].filePath)}
          >
            Read Ticket
          </IonButton>
          <IonButton onClick={() => state.user && takePhoto(state.user)}>Take Photo</IonButton>
          <ExploreContainer name="Scan ticket page" />
          <IonGrid>
            <IonRow>
              {photos.map((photo, index) => (
                <IonCol size="6" key={nanoid()}>
                  <IonImg src={photo.webviewPath} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ScanTicket;
