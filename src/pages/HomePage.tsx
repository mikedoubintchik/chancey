import { IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import Header from 'components/Header';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import SideMenu from 'components/SideMenu';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { useEffect, useState } from 'react';
import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
const HomePage: React.FC = () => {
  const { getLatesMegaResults } = useHistoricalData();
  const [latestResult, setLatestResult] = useState<LotteryDrawModel | undefined>(undefined);

  useEffect(() => {
    getLatesMegaResults().then((data) => setLatestResult(data));
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
          <IonCard href="/history">
            <IonCardHeader style={{ textAlign: 'center' }}>Winning Numbers</IonCardHeader>
            {latestResult === undefined ? (
              <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
            ) : (
              <LotteryDraw draw={latestResult} />
            )}
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;
