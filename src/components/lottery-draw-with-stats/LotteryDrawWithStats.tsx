import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDrawWithStats.css';

import SingleNumberStats from 'components/stats/single-number-stats/SingleNumberStats';
import { useEffect, useState } from 'react';
import { UseFrequentNumberRule } from 'rules/UseFrequentNumbersRule';
import SeriesFrequency from 'components/stats/series-frequency/SeriesFrequency';
import Bar from 'components/bar/Bar';
import { max } from 'simple-statistics';

interface LotteryDrawWithStatsProps {
  draw: LotteryDrawModel | undefined;
  history: Array<LotteryDrawModel>;
}

const LotteryDrawWithStats: React.FC<LotteryDrawWithStatsProps> = ({ draw, history }) => {
  const [currentNum, setCurrentNum] = useState<{ num: number; isExtra: boolean } | null>(null);
  const [currentNumStats, setCurrentNumStats] = useState<number[]>([]);
  const getStats = () => {
    let currentDrawingIndex = history.findIndex((drawing) => {
      return drawing.date === draw?.date;
    });
    let windowSize = 50;
    let histryToCurrent = history.slice(currentDrawingIndex, currentDrawingIndex + windowSize);
    var len = histryToCurrent.length - windowSize;
    if (len <= 0) {
      len = histryToCurrent.length;
    }
    let counts = [0, 0, 0, 0, 0, 0];
    if (draw) {
      for (var i = 0; i < len; i++) {
        let currDraw = histryToCurrent[i];
        for (var numIndex = 0; numIndex < draw.series.numbers.length; numIndex++) {
          if (currDraw.series.numbers.indexOf(draw.series.numbers[numIndex]) >= 0) {
            counts[numIndex] += 1;
          }
        }
        if (draw.series.extra == currDraw.series.extra) {
          counts[draw.series.numbers.length] += 1;
        }
      }
    }

    return counts;
  };

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

    setCurrentNumStats(counts);
  };

  const getStatsView = () => {
    if (draw) {
      let stats = getStats();
      let maxNum = max(stats);
      return (
        <div className="series-bars-container">
          <div className="series-bars-data">
            {draw.series.numbers.map((n, i) => (
              <div key={n}>
                <Bar index={i} height={200} maxVal={maxNum} value={stats[i]}></Bar>
              </div>
            ))}

            {draw.series.extra != null && (
              <div>
                <Bar
                  index={6}
                  height={200}
                  maxVal={maxNum}
                  value={stats[draw.series.numbers.length]}
                  color="#BD4F46"
                ></Bar>
              </div>
            )}
          </div>
          <div className="series-bars-title">
            <div>Occurance in recent 50 drawings</div>
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    if (draw) {
      let num = draw.series.numbers[0];
      setCurrentNum({ num: num, isExtra: false });
      processStats(num, false);
    }
  }, [draw]);
  return (
    <div className="lottery-draw-with-stats">
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
      {/* {draw && <SeriesFrequency stats={[currentNumStats]} />} */}
      {
        draw && getStatsView()
        // draw && (
        //   <div className="series-bars-container">
        //     {draw.series.numbers.map((n, i) => (
        //       <div key={n} >
        //         <Bar index={i} height={200} maxVal={10} value={5}></Bar>
        //       </div>
        //     ))}

        //     {draw.series.extra != null && (
        //       <div>
        //         <Bar index={6} height={200} maxVal={10} value={10}></Bar>
        //       </div>
        //     )}
        //   </div>
        // )
      }
    </div>
  );
};

export default LotteryDrawWithStats;
