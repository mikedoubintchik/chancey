import { IonCard, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from 'components/Header';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import SideMenu from 'components/SideMenu';
import { DrawType } from 'types/lottery-draw';
const HomePage: React.FC = () => {
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
            <LotteryDraw
              draw={{ type: DrawType.MEGA, series: { numbers: [1, 2, 22, 34, 45], extra: 34 }, date: new Date() }}
            />
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;
