import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <LotteryDraw
            draw={{ type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() }}
          ></LotteryDraw>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
