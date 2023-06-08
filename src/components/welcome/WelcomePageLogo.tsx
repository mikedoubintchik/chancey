import { IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'stores/IonicStorage';

const WelcomePageLogo: React.FC = (): React.ReactElement => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/welcome/name');
    }, 3000);
  }, [history]);

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <IonGrid>
          <IonRow
            className="ion-justify-content-center ion-align-items-center ion-text-center"
            style={{ height: '100vh' }}
          >
            <IonCol>
              <IonImg
                className="ion-align-self-center"
                src={require('../../assets/images/chansey.jpg')}
                alt="Chansey"
                style={{ width: '150px', height: '150px', margin: 'auto' }}
              />
              <div className="ion-margin-top font-bold">GET LUCKY!</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageLogo;
