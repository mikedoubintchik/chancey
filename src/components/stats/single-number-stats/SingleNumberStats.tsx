import StatsFrame, { StatsFrameMode } from 'components/stats/stats-frame/StatsFrame';
import { useEffect, useState } from 'react';
import './SingleNumberStats.css';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { LotteryDrawModel } from 'types/lottery-draw';
import Chart from 'react-apexcharts';
import { quantile, minSorted, maxSorted } from 'simple-statistics';

interface SingleNumberStatsProps {
  number: { num: number; isExtra: boolean } | null;
}

const getDefaultState = () => {
  return {
    series: [
      {
        data: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
      },
    ],
    options: {
      tooltip: {
        enabled: false,
      },
      chart: {
        type: 'line',

        toolbar: {
          show: false,
        },
        selection: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        width: 1,
      },
      // plotOptions: {
      //   bar: {
      //     horizontal: false
      //   },

      // },
      grid: {
        show: false, // Hide horizontal lines
      },
    },
  };
};

const SingleNumberStats: React.FC<SingleNumberStatsProps> = ({ number }) => {
  const [_chartState, setChartState] = useState(getDefaultState());
  useEffect(() => {
    console.log(number);
  }, [number]);
  return (
    <div style={{ marginTop: '20px', marginLeft: '-15px' }}>
      <Chart options={_chartState.options as any} series={_chartState.series as any} type="line" height={200} />
    </div>
  );
};

export default SingleNumberStats;
