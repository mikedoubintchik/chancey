import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { set } from 'stores/IonicStorage';

const WelcomePageName: React.FC = (): React.ReactElement => {
  const history = useHistory();

  const handleSkip = () => {
    history.push('/home');
    // TODO - distinguish between finished and skipped
    set('welcomeFinished', true);
  };

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <h1>Name</h1>
        <IonButton fill="clear" onClick={() => handleSkip()}>
          Skip
        </IonButton>
        <IonButton onClick={() => history.push('/welcome/lucky-token')}>Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageName;
