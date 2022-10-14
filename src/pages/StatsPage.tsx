import { IonCard, IonContent, IonPage, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import Header from 'components/Header';
import NumbersFrequency from 'components/stats/numbers-frequency/NumbersFrequency';
import NumberRanges from 'components/stats/number-ranges/NumberRanges';

import SideMenu from 'components/SideMenu';

import { useState } from 'react';

const StatsPage: React.FC = () => {
  const [_showLast, setShowLast] = useState(10);

  const handleChage = (event: any) => {
    // console.log(event.detail.value);
    setShowLast(parseInt(event.detail.value));
  };
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonToolbar class="solid-clear">
          <IonSelect onIonChange={handleChage} interface="popover" placeholder="Recent Drawings" value={_showLast}>
            <IonSelectOption value={10}>Last 10 Drawings</IonSelectOption>
            <IonSelectOption value={50}>Last 50 Drawings</IonSelectOption>
            <IonSelectOption value={100}>Last 100 Drawings</IonSelectOption>
            <IonSelectOption value={200}>Last 200 Drawings</IonSelectOption>
            <IonSelectOption value={400}>Last 400 Drawings</IonSelectOption>
          </IonSelect>
        </IonToolbar>

        <IonContent fullscreen>
          <NumbersFrequency showLast={_showLast}></NumbersFrequency>
          <NumberRanges showLast={_showLast}></NumberRanges>
        </IonContent>
      </IonPage>
    </>
  );
};

export default StatsPage;
