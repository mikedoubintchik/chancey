import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { LotteryDrawModel } from 'types/lottery-draw';
import { Virtuoso } from 'react-virtuoso';

// import './Tab1.css';

const HistoryPage: React.FC = () => {
  let draws: Array<LotteryDrawModel> = [
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
    { type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() },
  ];
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>Historical Data</IonTitle>
      </IonToolbar>
      <IonContent>
        <Virtuoso
          style={{ height: '100%' }}
          totalCount={draws.length}
          itemContent={(index) => {
            return (
              <IonItem>
                <LotteryDraw draw={draws[index]}></LotteryDraw>
              </IonItem>
            );
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
