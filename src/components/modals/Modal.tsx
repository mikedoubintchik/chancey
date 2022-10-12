import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { ReactNode } from 'react';

interface IModal {
  isOpen: boolean;
  hideModal: () => void;
  children?: ReactNode;
  title: string;
}

const Modal: React.FC<IModal> = (props) => {
  const { isOpen, hideModal, children, title } = props;

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton shape="round" fill="clear" onClick={() => hideModal()}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle slot="">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
    </IonModal>
  );
};

export default Modal;
