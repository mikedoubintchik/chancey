import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDraw.css';
import { calendarOutline } from 'ionicons/icons';

interface LotteryDrawProps {
  draw: LotteryDrawModel;
}

const LotteryDraw: React.FC<LotteryDrawProps> = ({ draw }) => {
  return (
    <div>
      <IonCardHeader class="lottery-draw-header">
        <IonLabel class="lottery-draw-date-label">{draw.date.toLocaleDateString()}</IonLabel>
        <IonIcon icon={calendarOutline} />
      </IonCardHeader>
      <IonCardContent>
        <Series numbers={draw.series.numbers} extra={draw.series.extra} />
      </IonCardContent>
    </div>
  );
};

export default LotteryDraw;
