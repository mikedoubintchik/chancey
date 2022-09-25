import { IonButton, IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { auth, db, storage, functions } from 'config/firebase';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { ActionType, useStore } from 'store';
import { IUser, UserRegisterMethodType, UserType } from 'types/profile';
import { useFirebase } from '../hooks/useFirebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { onAuthStateChange, login, logout } = useFirebase();
  const [error, setError] = useState<string>();
  const [method, setMethod] = useState<UserRegisterMethodType>();
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ loggedIn: false, uid: null });
  const { dispatch } = useStore();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);

    return () => unsubscribe();
  }, [onAuthStateChange]);

  const requestLogin = useCallback(
    async (method: UserRegisterMethodType) => {
      try {
        await login(method, dispatch, history);
        // TODO: fix any
      } catch (error: any) {
        setError(error.message);
        setShowErrorToast(true);
      }
    },
    [login, dispatch, history],
  );

  const requestLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!user.loggedIn && (
          <>
            <IonButton onClick={() => requestLogin(UserRegisterMethodType.google)}>
              <FontAwesomeIcon icon={['fab', 'google']} />
              {'  Login with Google'}
            </IonButton>
            <IonButton onClick={() => requestLogin(UserRegisterMethodType.facebook)}>
              <FontAwesomeIcon icon={['fab', 'facebook']} />
              {'  Login with Facebook'}
            </IonButton>
          </>
        )}
        {user.loggedIn && <IonButton onClick={requestLogout}>Logout</IonButton>}
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
