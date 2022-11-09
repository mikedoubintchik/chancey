import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'stores/IonicStorage';

const WelcomePageLogo: React.FC = (): React.ReactElement => {
  const history = useHistory();

  useEffect(() => {
    get('welcomeFinished').then((welcomeFinished) => {
      if (!welcomeFinished) {
        setTimeout(() => {
          history.push('/welcome/name');
        }, 3000);
      }
    });
  }, [history]);

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <h1>Logo</h1>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageLogo;
