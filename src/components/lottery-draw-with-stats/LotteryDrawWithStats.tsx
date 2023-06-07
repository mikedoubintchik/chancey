import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDrawWithStats.css';

import SingleNumberStats from 'components/stats/single-number-stats/SingleNumberStats';
import { useEffect, useState } from 'react';
import { UseFrequentNumberRule } from 'rules/UseFrequentNumbersRule';

interface LotteryDrawWithStatsProps {
  draw: LotteryDrawModel | undefined;
  history: Array<LotteryDrawModel>;
}

const LotteryDrawWithStats: React.FC<LotteryDrawWithStatsProps> = ({ draw, history }) => {
  const [currentNum, setCurrentNum] = useState<{ num: number; isExtra: boolean } | null>(null);
  const [currentNumStats, setCurrentNumStats] = useState<number[]>([]);
  const processStats = (num: number, isExtra: boolean) => {
    let currentDrawingIndex = history.findIndex((drawing) => {
      return drawing.date === draw?.date;
    });
    // console.log("currentDrawingIndex",currentDrawingIndex)
    let maxScanBack = 200;
    let windowSize = 50;
    let histryToCurrent = history.slice(currentDrawingIndex, currentDrawingIndex + maxScanBack);
    var len = histryToCurrent.length - windowSize;
    if (len <= 0) {
      len = histryToCurrent.length;
    }
    // console.log("historical len",len)
    let counts = [];
    for (var i = 0; i < len; i++) {
      counts.push(0);
      for (var o = 0; o < windowSize; o++) {
        let index = i + o;
        if (index < len) {
          let numbers = histryToCurrent[index].series.numbers;
          if (numbers.indexOf(num) > -1 || (isExtra && num == histryToCurrent[index].series.extra)) {
            counts[i] += 1;
          }
        }
      }
    }
    if (counts.length < windowSize) {
      for (var i = 0; i < windowSize - counts.length; i++) {
        counts.push(0);
      }
    }
    counts = counts.reverse();
    // if(len<51){
    //   for(var i = 0 ; i<49;i++){
    //     counts.push(0);
    //   }
    //   var singleCount = 0;
    //   for (var i = 0; i < len; i++) {
    //     let numbers = histryToCurrent[i].series.numbers;
    //     if (numbers.indexOf(num) > -1) {
    //       singleCount += 1;
    //     }
    //   }
    //   counts.push(singleCount);
    //   console.log(counts)
    // }
    // else{

    // }
    setCurrentNumStats(counts);
  };

  useEffect(() => {
    if (draw) {
      let num = draw.series.numbers[0];
      setCurrentNum({ num: num, isExtra: false });
      processStats(num, false);
    }
  }, [draw]);
  return (
    <div>
      {draw && (
        <Series
          numbers={draw.series.numbers}
          extra={draw.series.extra}
          onBallClick={(n, ie) => {
            // console.log('onBallClick');
            setCurrentNum({ num: n, isExtra: ie });
            processStats(n, ie);
          }}
        />
      )}
      {draw && <SingleNumberStats stats={currentNumStats} />}
    </div>
  );
};

export default LotteryDrawWithStats;
