import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDraw.css';
import { calendarOutline } from 'ionicons/icons';
import { getDefaultLDM } from 'utils/lottery-utils';

interface LotteryDrawProps {
  draw: LotteryDrawModel | undefined;
}

const LotteryDraw: React.FC<LotteryDrawProps> = ({ draw }) => {
  let finalDraw = draw !== undefined ? (draw as LotteryDrawModel) : getDefaultLDM();
  return (
    <div>
      <Series numbers={finalDraw.series.numbers} extra={finalDraw.series.extra} onBallClick={(n, ie) => {}} />
    </div>
  );
};

export default LotteryDraw;
