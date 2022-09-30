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
import { set } from 'stores/IonicStorage';
import { useFirebase } from 'hooks/useFirebase';
import Header from 'components/Header';

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
  const { getHistoricalData } = useFirebase();

  const refresh = async () => set('historicalData', await getHistoricalData());

  // TODO: fix any
  // refresh historical data every 10 seconds
  const refreshHistoricalData = (e: any) => {
    console.log('refreshing historical data');
    refresh();

    setTimeout(() => {
      e.detail.complete();
    }, 10000);
  };

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
            totalCount={draws.length}
            itemContent={(index) => {
              return (
                <IonItem>
                  <LotteryDraw draw={draws[index]} />
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
