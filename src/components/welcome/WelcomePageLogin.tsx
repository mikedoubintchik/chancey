import { IonButton, IonContent, IonPage } from '@ionic/react';
import Login from 'components/login/Login';
import { useHistory } from 'react-router-dom';

const WelcomePageLogin: React.FC = (): React.ReactElement => {
  const history = useHistory();

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <h1>Login</h1>
        <Login />
        <IonButton fill="clear" onClick={() => history.go(-1)}>
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageLogin;
