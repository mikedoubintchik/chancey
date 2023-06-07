import StatsFrame, { StatsFrameMode } from 'components/stats/stats-frame/StatsFrame';
import { useEffect, useState } from 'react';
import './SingleNumberStats.css';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { LotteryDrawModel } from 'types/lottery-draw';
import Chart from 'react-apexcharts';
import { quantile, minSorted, maxSorted } from 'simple-statistics';
import { IonLabel } from '@ionic/react';

interface SingleNumberStatsProps {
  // number: { num: number; isExtra: boolean } | null;
  // history: Array<LotteryDrawModel>;
  stats: number[];
}

const getDefaultState = () => {
  return {
    series: [
      {
        data: [{}],
      },
    ],
    options: {
      subtitle: {
        text: 'Historical occurances trend',
        align: 'left',
        floating: true,
        offsetY: 180,
        offsetX: 1,
        style: {
          fontSize: '12px',
          color: '#FFFFFF',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,

          offsetX: -10,
          offsetY: 10,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,

          offsetX: -10,
          offsetY: 10,
        },
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

const SingleNumberStats: React.FC<SingleNumberStatsProps> = ({ stats }) => {
  const [_chartState, setChartState] = useState(getDefaultState());

  useEffect(() => {
    // console.log(stats);
    if (stats) {
      let state = getDefaultState();
      state.series[0].data = stats;
      setChartState(state);
    }
  }, [stats]);
  return (
    <div style={{ marginTop: '20px', marginLeft: '-15px' }}>
      <Chart options={_chartState.options as any} series={_chartState.series as any} type="line" height={200} />
    </div>
  );
};

export default SingleNumberStats;
