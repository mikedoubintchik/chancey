import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const WelcomePageLuckyToken: React.FC = (): React.ReactElement => {
  const history = useHistory();

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <h1>Lucky Token</h1>
        <IonButton onClick={() => history.go(-1)}>Back</IonButton>
        <IonButton onClick={() => history.push('/welcome/login')}>Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageLuckyToken;
