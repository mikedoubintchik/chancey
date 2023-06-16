import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import LotteryDrawWithStats from 'components/lottery-draw-with-stats/LotteryDrawWithStats';
import LoginModal from 'components/modals/LoginModal';
import useModal from 'hooks/useModal';
import { usePhotoGallery } from 'hooks/usePhotoGallery';
import { cameraOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from 'stores/store';
import { LotteryDrawModel } from 'types/lottery-draw';

const HomePage: React.FC = () => {
  const { state } = useStore();
  const history = useHistory();
  const [currentDrawing, setCurrentDrawing] = useState<LotteryDrawModel | undefined>(undefined);
  const [isLoginModalOpen, showLoginModal, hideLoginModal] = useModal();
  const { takePhoto } = usePhotoGallery();

  const DateDropdown = () => {
    return (
      <IonSelect
        placeholder="Select Drawing Date"
        interface="popover"
        id="asd"
        onIonChange={(ev) => setCurrentDrawing(ev.detail.value)}
        selectedText={currentDrawing ? currentDrawing.date.toDateString() : undefined}
      >
        {state.historicalData.map((drawing) => {
          return (
            <IonSelectOption key={drawing.date.toDateString()} value={drawing}>
              {drawing.date.toDateString()}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    );
  };

  const handleCameraClick = async () => {
    if (state.user) {
      console.log('taking photo...');
      await takePhoto(state.user);
      history.push('/validate-scan');
    } else {
      showLoginModal();
    }
  };

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard id="latest-result">
            <IonCardHeader>
              <IonToolbar>
                <IonCardTitle className="title-left">Mega Millions</IonCardTitle>
                <IonButtons slot="end" className="date-dropdown">
                  <DateDropdown />
                </IonButtons>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              {state.historicalData.length === 0 && (
                <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
              )}
              {state.historicalData.length > 0 && (
                <LotteryDrawWithStats draw={state.historicalData[0]} history={state.historicalData} />
              )}
            </IonCardContent>
          </IonCard>
          {/* <DrawingsGenerator count={1} showMax={10}></DrawingsGenerator> */}
          <IonCard>
            <IonCardContent class="ion-text-center">
              <IonButton fill="clear" onClick={handleCameraClick}>
                <IonIcon slot="icon-only" size="large" icon={cameraOutline}></IonIcon>
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <LoginModal isOpenModal={isLoginModalOpen} hideModal={hideLoginModal} />
      </IonPage>
    </>
  );
};

export default HomePage;
