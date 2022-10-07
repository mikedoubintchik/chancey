import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { ReactNode } from 'react';

interface IModal {
  isOpen: boolean;
  hideModal: () => void;
  children?: ReactNode;
}

const Modal: React.FC<IModal> = (props) => {
  const { isOpen, hideModal, children } = props;

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={hideModal}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
    </IonModal>
  );
};

export default Modal;
