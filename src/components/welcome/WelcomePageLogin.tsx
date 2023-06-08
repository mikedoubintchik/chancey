import { IonContent, IonPage } from '@ionic/react';
import Login from 'components/login/Login';

const WelcomePageLogin: React.FC = (): React.ReactElement => {
  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageLogin;
