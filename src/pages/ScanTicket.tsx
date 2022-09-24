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
import { useFirebase } from 'hooks/useFirebase';
import ExploreContainer from 'components/ExploreContainer';
import { usePhotoGallery } from 'hooks/usePhotoGallery';

const ScanTicket: React.FC = () => {
  const { photos, takePhoto } = usePhotoGallery();
  const { readNumbersFromTicket } = useFirebase();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan Ticket</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Scan Ticket</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={() => readNumbersFromTicket(photos)}>Read Ticket</IonButton>
        <IonButton onClick={() => takePhoto()}>Take Photo</IonButton>
        <ExploreContainer name="Scan ticket page" />
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ScanTicket;
