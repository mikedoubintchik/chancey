import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';

import RulesEngine from 'components/rules-engine/RulesEngine';

const RulesPage: React.FC = () => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Rules</IonTitle>
            </IonToolbar>
          </IonHeader>
          <RulesEngine></RulesEngine>
        </IonContent>
      </IonPage>
    </>
  );
};

export default RulesPage;
