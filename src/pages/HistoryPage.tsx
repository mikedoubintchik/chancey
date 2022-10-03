import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
import { Virtuoso } from 'react-virtuoso';
import SideMenu from 'components/SideMenu';
import { set, get } from 'stores/IonicStorage';
import { useFirebase } from 'hooks/useFirebase';
import { useHistoricalData } from 'hooks/useHistoricalData';
import Header from 'components/Header';
import { useEffect, useState } from 'react';

const HistoryPage: React.FC = () => {
  // const { getHistoricalData } = useFirebase();
  const [latestResults, setLatestResults] = useState<Array<LotteryDrawModel>>([]);
  const { getHistoricalData } = useHistoricalData();
  const refresh = async () => {
    // await updateRemoteWithMegaData();
    let historicalData = await getHistoricalData(false);
    set('historical-data-mega', historicalData);
    setLatestResults(historicalData);
  };
  // TODO: fix any
  // refresh historical data every 10 seconds
  const refreshHistoricalData = (e: any) => {
    console.log('refreshing historical data');
    refresh();

    setTimeout(() => {
      e.detail.complete();
    }, 10000);
  };

  useEffect(() => {
    const fetchData = async () => {
      var data = await getHistoricalData(true);
      setLatestResults(data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header pageTitle="Historical Data" />
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={refreshHistoricalData}>
            <IonRefresherContent />
          </IonRefresher>
          <Virtuoso
            style={{ height: '100%' }}
            totalCount={latestResults.length}
            itemContent={(index) => {
              return (
                <IonItem>
                  <LotteryDraw draw={latestResults[index]} />
                </IonItem>
              );
            }}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default HistoryPage;
