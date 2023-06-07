import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import DrawingsGenerator from 'components/drawings-generator/DrawingsGenerator';
import Header from 'components/Header';
import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import Modal from 'components/modals/Modal';
import SideMenu from 'components/SideMenu';
import { useHistoricalData } from 'hooks/useHistoricalData';
import useModal from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { LotteryDrawModel } from 'types/lottery-draw';
import HistoryPage from './HistoryPage';
import LotteryDrawWithStats from 'components/lottery-draw-with-stats/LotteryDrawWithStats';
const HomePage: React.FC = () => {
  const { getHistoricalData } = useHistoricalData();
  const [latestResults, setLatestResults] = useState<Array<LotteryDrawModel> | []>([]);
  const [currentDrawing, setCurrentDrawing] = useState<LotteryDrawModel | undefined>(undefined);
  const [isOpen, showModal, hideModal] = useModal();

  useEffect(() => {
    getHistoricalData().then((data) => {
      setLatestResults(data);
      setCurrentDrawing(data[0]);
    });
  }, []);

  const DateDropdown = () => {
    return (
      <IonSelect
        placeholder="Select Drawing Date"
        interface="popover"
        onIonChange={(ev) => setCurrentDrawing(ev.detail.value)}
        selectedText={currentDrawing ? currentDrawing.date.toDateString() : undefined}
      >
        {latestResults.map((drawing) => (
          <IonSelectOption key={drawing.date.toDateString()} value={drawing}>
            {drawing.date.toDateString()}
          </IonSelectOption>
        ))}
      </IonSelect>
    );
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
                <IonCardTitle className="title-left">Winning Numbers</IonCardTitle>
                <IonButtons slot="end" className="date-dropdown">
                  <DateDropdown />
                </IonButtons>
              </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
              {' '}
              {!currentDrawing && (
                <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
              )}
              {currentDrawing && <LotteryDrawWithStats draw={currentDrawing} />}
            </IonCardContent>
          </IonCard>
          {/* <DrawingsGenerator count={1} showMax={10}></DrawingsGenerator> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;
