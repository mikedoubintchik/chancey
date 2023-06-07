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
        data: [1, 2, 3, 4, 5],
      },
    ],
    options: {
      chart: {
        type: 'boxPlot',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%',
        },
        boxPlot: {
          colors: {
            upper: '#e9ecef',
            lower: '#f8f9fa',
          },
        },
      },
      stroke: {
        colors: ['#6c757d'],
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
    <div>
      <Chart options={_chartState.options as any} series={_chartState.series as any} type="line" height={200} />
    </div>
  );
};

export default SingleNumberStats;
