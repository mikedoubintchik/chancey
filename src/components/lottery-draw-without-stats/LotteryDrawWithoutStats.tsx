import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { useEffect, useState } from 'react';
import { useStore } from 'stores/store';
import { LotteryDrawModel } from 'types/lottery-draw';

const LotteryDrawWithoutStats: React.FC = () => {
  const { state } = useStore();
  const [currentDrawing, setCurrentDrawing] = useState<LotteryDrawModel>();

  const DateDropdown = () => {
    return (
      <IonSelect
        placeholder="Select Drawing Date"
        interface="popover"
        id="asd"
        onIonChange={(ev) => setCurrentDrawing(ev.detail.value)}
        selectedText={currentDrawing?.date.toDateString()}
      >
        {state.historicalData.map((drawing) => {
          return (
            <IonSelectOption key={drawing.date.toDateString()} value={drawing}>
              {drawing.date.toDateString()}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    );
  };

  useEffect(() => {
    setCurrentDrawing(state.historicalData[0]);
  }, [state.historicalData]);

  return (
    <IonCard id="latest-result">
      <IonCardHeader>
        <IonToolbar>
          <IonCardTitle className="title-left">Mega Millions</IonCardTitle>
          <IonButtons slot="end" className="date-dropdown">
            <DateDropdown />
          </IonButtons>
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent>
        {state.historicalData.length === 0 && (
          <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
        )}
        {state.historicalData.length > 0 && <LotteryDraw draw={currentDrawing} />}
      </IonCardContent>
    </IonCard>
  );
};

export default LotteryDrawWithoutStats;
