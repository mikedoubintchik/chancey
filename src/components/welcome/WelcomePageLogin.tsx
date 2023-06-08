import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow } from '@ionic/react';
import { useFirebase } from 'hooks/useFirebase';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { UserRegisterMethodType } from 'types/profile';

const WelcomePageLogin: React.FC = (): React.ReactElement => {
  const { login, redirectToHome, registerUser } = useFirebase();

  const [, setError] = useState<string>();

  const [, setShowErrorToast] = useState<boolean>(false);

  const requestLogin = useCallback(
    async (method: UserRegisterMethodType) => {
      try {
        await login(method);
        // TODO: fix any
      } catch (error: any) {
        setError(error.message);
        setShowErrorToast(true);
      }
    },
    [login, setError],
  );

  const handleContinueAsGuest = () => {
    const user = {
      displayName: 'Guest',
      email: '',
      photoURL: '',
      providerId: 'guest',
      uid: nanoid(),
    };

    registerUser(user, false);
    redirectToHome();
  };

  return (
    <IonPage id="main-content">
      <IonContent fullscreen>
        <IonGrid fixed={true}>
          <IonRow className="ion-align-items-center" style={{ height: '100vh' }}>
            <IonCol size="8" offset="2">
              <IonImg
                className="ion-align-self-center"
                src={require('../../assets/images/chansey.jpg')}
                alt="Chansey"
                style={{ width: '150px', height: '150px', margin: 'auto' }}
              />
              <IonButton expand="full" onClick={() => requestLogin(UserRegisterMethodType.google)}>
                <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'google']} />
                Login with Google
              </IonButton>
              <IonButton expand="full" onClick={() => requestLogin(UserRegisterMethodType.facebook)}>
                <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'facebook']} />
                Login with Facebook
              </IonButton>
              <IonButton expand="full" fill="clear" onClick={() => handleContinueAsGuest()}>
                Continue as Guest
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePageLogin;
