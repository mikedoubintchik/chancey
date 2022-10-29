import { IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
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
const HomePage: React.FC = () => {
  const { getLatestMegaResults } = useHistoricalData();
  const [latestResult, setLatestResult] = useState<LotteryDrawModel | undefined>(undefined);
  const [isOpen, showModal, hideModal] = useModal();

  useEffect(() => {
    getLatestMegaResults().then((data) => setLatestResult(data));
  }, []);

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
          <IonCard onClick={() => showModal()}>
            <IonCardHeader style={{ textAlign: 'center' }}>Winning Numbers</IonCardHeader>
            {!latestResult && (
              <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
            )}

            {latestResult && <LotteryDraw draw={latestResult} />}
          </IonCard>
          <DrawingsGenerator count={1} showMax={10}></DrawingsGenerator>
        </IonContent>
        <Modal isOpen={isOpen} hideModal={hideModal} title="Previous Drawings">
          <HistoryPage></HistoryPage>
        </Modal>
      </IonPage>
    </>
  );
};

export default HomePage;
