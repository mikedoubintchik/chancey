import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDrawWithStats.css';

import SingleNumberStats from 'components/stats/single-number-stats/SingleNumberStats';
import { useEffect, useState } from 'react';

interface LotteryDrawWithStatsProps {
  draw: LotteryDrawModel | undefined;
}

const LotteryDrawWithStats: React.FC<LotteryDrawWithStatsProps> = ({ draw }) => {
  const [currentNum, setCurrentNum] = useState<{ num: number; isExtra: boolean } | null>(null);
  useEffect(() => {
    if (draw) {
      setCurrentNum({ num: draw?.series.numbers[0], isExtra: false });
    }
  }, [draw]);
  return (
    <div>
      {draw && (
        <Series
          numbers={draw.series.numbers}
          extra={draw.series.extra}
          onBallClick={(n, ie) => {
            console.log('onBallClick');
            setCurrentNum({ num: n, isExtra: ie });
          }}
        />
      )}
      {draw && <SingleNumberStats number={currentNum} />}
    </div>
  );
};

export default LotteryDrawWithStats;
