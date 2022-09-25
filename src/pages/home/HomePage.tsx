import { IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { useStore } from 'store';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { state } = useStore();
  return (
    <IonPage>
      {/* <IonHeader> */}
      <IonToolbar>
        <IonTitle>{state.user ? 'Hello ' + state.user.displayName + '!' : ''}</IonTitle>
      </IonToolbar>
      {/* </IonHeader> */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard href="/history">
          <IonCardHeader style={{ textAlign: 'center' }}>Winning Numbers</IonCardHeader>
          <LotteryDraw
            draw={{ type: 'mega', series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() }}
          ></LotteryDraw>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
