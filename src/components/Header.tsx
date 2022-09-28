import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useStore } from 'stores/store';

interface IHeader {
  pageTitle?: string;
}

const Header: React.FC<IHeader> = ({ pageTitle }) => {
  const { state } = useStore();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="home" />
        </IonButtons>
        <IonButtons slot="end">
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>{pageTitle || (state.user ? `Hello ${state.user.displayName}!` : 'Please Login')}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
