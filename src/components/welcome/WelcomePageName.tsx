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
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { set } from 'stores/IonicStorage';
import { chevronForwardOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';
import { ActionType, useStore } from 'stores/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WelcomePageName: React.FC = (): React.ReactElement => {
  const { state, dispatch } = useStore();
  const history = useHistory();

  const handleSkip = () => {
    history.push('/welcome/lucky-token');

    dispatch({
      type: ActionType.UPDATE_USER_NAME,
      displayName: 'Lucky User',
    });
  };

  const handleChange = (event: CustomEvent<InputChangeEventDetail>) => {
    dispatch({
      type: ActionType.UPDATE_USER_NAME,
      displayName: event.detail.value,
    });
  };

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-justify-content-center">
              <h1>Welcome to Chancey</h1>
              <p>You are lucky to be here and we are lucky to have you</p>
              <IonItem fill="outline">
                <IonLabel position="floating">What is your name?</IonLabel>
                <IonInput placeholder="Enter your name" onIonChange={handleChange}></IonInput>
              </IonItem>
              {/* Input field */}
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
            <IonCol>
              <IonImg
                className="ion-align-self-center"
                src={require('../../assets/images/chansey.jpg')}
                alt="Chansey"
                style={{ width: '150px', height: '150px', margin: 'auto' }}
              />
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

            <IonButton fill="clear" className="next-button" onClick={() => history.push('/welcome/lucky-token')}>
              Next
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default WelcomePageName;
