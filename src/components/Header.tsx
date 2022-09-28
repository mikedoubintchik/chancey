import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useStore } from 'store';

const Header = () => {
  const { state } = useStore();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>{state.user ? `Hello ${state.user.displayName}!` : 'Please Login'}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
