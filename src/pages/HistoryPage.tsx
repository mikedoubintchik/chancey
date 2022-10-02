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

const draws: Array<LotteryDrawModel> = [
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  { type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
];

const HistoryPage: React.FC = () => {
  // const { getHistoricalData } = useFirebase();
  const [latestResults, setLatestResults] = useState<Array<LotteryDrawModel>>([]);
  const { getHistoricalData } = useHistoricalData();
  const refresh = async () => {
    // await updateRemoteWithMegaData();
    let historicalData = await getHistoricalData();
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
      var data = await get('historical-data-mega');
      if (data.length) {
        console.log('loaded history from cache');
        setLatestResults(data);
      } else {
        data = await getHistoricalData();
        setLatestResults(data);
      }
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
