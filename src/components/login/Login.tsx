import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonButton, IonMenuToggle, IonNavLink, IonRouterLink, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useFirebase } from 'hooks/useFirebase';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { set } from 'stores/IonicStorage';
import { UserRegisterMethodType } from 'types/profile';

const Login: React.FC = () => {
  const { login } = useFirebase();
  const history = useHistory();
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
    history.push('/home');

    set('welcomeFinished', true);
  };

  return (
    <IonGrid fixed={true}>
      <IonRow>
        <IonCol size="6" offset="3">
          <IonButton expand="full" onClick={() => requestLogin(UserRegisterMethodType.google)}>
            <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'google']} />
            Login with Google
          </IonButton>
          <IonButton expand="full" onClick={() => requestLogin(UserRegisterMethodType.facebook)}>
            <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'facebook']} />
            Login with Facebook
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={() => handleContinueAsGuest}>
            Continue as Guest
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Login;
