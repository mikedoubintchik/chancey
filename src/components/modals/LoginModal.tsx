import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLoading,
  IonMenuToggle,
  IonModal,
  IonRow,
  IonText,
} from '@ionic/react';
import Modal from 'components/modals/Modal';
import { useFirebase } from 'hooks/useFirebase';
import { useCallback, useRef, useState } from 'react';
import { useStore } from 'stores/store';
import { UserRegisterMethodType } from 'types/profile';

interface IModal {
  isOpenModal: boolean;
  hideModal: () => void;
}

const AddRuleModal: React.FC<IModal> = ({ isOpenModal, hideModal }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { state, dispatch } = useStore();
  const [showLoading, setShowLoading] = useState(false);
  const { login, logout } = useFirebase();
  const [, setError] = useState<string>();
  const [, setShowErrorToast] = useState<boolean>(false);

  const requestLogin = useCallback(
    async (method: UserRegisterMethodType) => {
      try {
        await login(method);
        hideModal();
        // TODO: fix any
      } catch (error: any) {
        setError(error.message);
        setShowErrorToast(true);
      }
    },
    [login, setError, hideModal],
  );

  return (
    <Modal isOpen={isOpenModal} hideModal={hideModal} title="Login Modal">
      <IonLoading
        cssClass="loading-indicator"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Logging in...'}
        spinner="circular"
      />
      <IonContent className="ion-align-items-center ion-padding">
        <p>You must login in order to use the scan ticket function</p>
        <IonMenuToggle>
          <IonButton onClick={() => requestLogin(UserRegisterMethodType.google)}>
            <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'google']} />
            Login with Google
          </IonButton>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonButton onClick={() => requestLogin(UserRegisterMethodType.facebook)}>
            <FontAwesomeIcon className="ion-margin-end" icon={['fab', 'facebook']} />
            Login with Facebook
          </IonButton>
        </IonMenuToggle>
      </IonContent>
    </Modal>
  );
};

export default AddRuleModal;
