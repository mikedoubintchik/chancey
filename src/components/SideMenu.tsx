import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { useFirebase } from 'hooks/useFirebase';
import { useCallback, useState } from 'react';
import { useStore } from 'store';
import { UserRegisterMethodType } from 'types/profile';

const SideMenu = () => {
  const { login, logout } = useFirebase();
  const [, setError] = useState<string>();

  const [, setShowErrorToast] = useState<boolean>(false);
  const { state } = useStore();
  console.log('state', state);

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

  const requestLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <IonMenu contentId="main-content" side="end">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{state.user ? `Hello ${state.user.displayName}!` : 'Please Login'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!state?.user && (
          <>
            <IonMenuToggle>
              <IonButton onClick={() => requestLogin(UserRegisterMethodType.google)}>
                <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'google']} />
                {'Login with Google'}
              </IonButton>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonButton onClick={() => requestLogin(UserRegisterMethodType.facebook)}>
                <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'facebook']} />
                {'Login with Facebook'}
              </IonButton>
            </IonMenuToggle>
          </>
        )}
        {state?.user && (
          <IonMenuToggle>
            <IonButton onClick={requestLogout}>Logout</IonButton>
          </IonMenuToggle>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
