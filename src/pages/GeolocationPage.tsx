import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation';
import { IonButton, IonLoading, IonToast } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';

interface LocationError {
  showError: boolean;
  message?: string;
}

const GeolocationPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<LocationError>({ showError: false });
  const [position, setPosition] = useState<Geoposition>();
  const getLocation = async () => {
    setLoading(true);

    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      setLoading(false);
      setError({ showError: false });
    } catch (e: any) {
      setError({ showError: true, message: e.message });
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GeolocationPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Geolocation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Geolocation page" />
        <>
          <IonLoading isOpen={loading} onDidDismiss={() => setLoading(false)} message={'Getting Location...'} />
          <IonToast
            isOpen={error.showError}
            onDidDismiss={() => setError({ message: '', showError: false })}
            message={error.message}
            duration={3000}
          />
          <IonButton color="primary" onClick={getLocation}>
            {position ? `${position.coords.latitude} ${position.coords.longitude}` : 'Get Location'}
          </IonButton>
        </>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
