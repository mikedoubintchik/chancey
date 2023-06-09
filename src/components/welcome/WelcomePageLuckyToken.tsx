import {
  InputChangeEventDetail,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { chevronBackOutline, chevronForwardOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';
import { ActionType, useStore } from 'stores/store';
import { set } from 'stores/IonicStorage';

const WelcomePageLuckyToken: React.FC = (): React.ReactElement => {
  const { state, dispatch } = useStore();
  const history = useHistory();

  const generateLuckyToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * 6);
      hash += characters[randomIndex];
    }

    return hash;
  };

  const handleSkip = () => {
    history.push('/welcome/login');
    dispatch({
      type: ActionType.UPDATE_USER_TOKEN,
      token: generateLuckyToken(),
    });
  };

  const handleChange = (event: CustomEvent<InputChangeEventDetail>) => {
    dispatch({
      type: ActionType.UPDATE_USER_TOKEN,
      token: event.detail.value,
    });
  };

  return (
    <IonPage id="main-content">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/welcome/name" text="" icon={chevronBackOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-justify-content-center">
              <h1>Hi {state.signupUser?.displayName}</h1>
              <p>Chancey maximizes your chances to win!</p>
              <p>It uses a special statistics engine and sparkle of luck!</p>
              <p>Chancey will use your lucky token to generate numbers unique to you.</p>
              <IonItem fill="outline">
                <IonLabel position="floating">What is your lucky token?</IonLabel>
                <IonInput placeholder="Enter your lucky token" onIonChange={handleChange}></IonInput>
              </IonItem>
              {/* Input field */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-align-items-center ion-justify-content-between ion-padding">
            <IonButton fill="clear" className="skip-button" onClick={() => handleSkip()}>
              Skip
            </IonButton>

            <IonIcon icon={ellipsisHorizontalCircleOutline} className="dot" />
            <IonIcon icon={ellipsisHorizontalCircleOutline} className="dot" />

            <IonButton fill="clear" className="next-button" onClick={() => history.push('/welcome/login')}>
              Next
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default WelcomePageLuckyToken;
