import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDrawWithStats.css';

import Bar from 'components/stats/bar/Bar';
import { useEffect, useState } from 'react';
import { max } from 'simple-statistics';

interface LotteryDrawWithStatsProps {
  draw: LotteryDrawModel | undefined;
  history: Array<LotteryDrawModel>;
}

const LotteryDrawWithStats: React.FC<LotteryDrawWithStatsProps> = ({ draw, history }) => {
  const [currentNum, setCurrentNum] = useState<{ num: number; isExtra: boolean } | null>(null);

  /*
    Summary - this function returns the number of times a number has been drawn in the last 50 draws
    @returns counts[] - an array of 6 numbers, the first 6 are the number of times each number has been drawn, the last number is the number of times the extra number has been drawn
  */
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

  /*
    Summary - this function returns the view of the stats
  */
  const getStatsView = () => {
    if (draw) {
      let stats = getStats();
      let maxNum = max(stats);
      return (
        <div className="series-bars-container">
          <div className="series-bars-data">
            {draw.series.numbers.map((n, i) => (
              <div key={n} className="series-bar-item">
                <Bar index={i} height={200} maxVal={maxNum} value={stats[i]}></Bar>
              </div>
            ))}

            {draw.series.extra != null && (
              <div className="series-bar-item-extra">
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
          }}
        />
      )}

      {draw && getStatsView()}
    </div>
  );
};

export default LotteryDrawWithStats;
