import StatsFrame, { StatsFrameMode } from 'components/stats/stats-frame/StatsFrame';
import { useEffect, useState } from 'react';
import './SeriesFrequency.css';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { LotteryDrawModel } from 'types/lottery-draw';
import Chart from 'react-apexcharts';
import { quantile, minSorted, maxSorted } from 'simple-statistics';
import { IonLabel } from '@ionic/react';
import Ball from 'components/ball/Ball';
import ReactDOMServer from 'react-dom/server';

interface SeriesFrequencyProps {
  stats: number[][];
}

const getDefaultState = () => {
  return {
    series: [
      {
        data: [1, 10, 5, 8, 5, 4],
      },
    ],
    options: {
      dataLabels: {
        enabled: true,

        offsetY: -20,
      },
      colors: ['rgb(189, 79, 70)'],
      plotOptions: {
        bar: {
          borderRadius: 10,
          borderRadiusApplication: 'around',
          columnWidth: '50%',
          barHeight: '100%',
          dataLabels: {
            position: 'top', // top, center, bottom
          },
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
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },

      chart: {
        type: 'bar',

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

      grid: {
        show: false, // Hide horizontal lines
      },
    },
  };
};

const SeriesFrequency: React.FC<SeriesFrequencyProps> = ({ stats }) => {
  const [_chartState, setChartState] = useState(getDefaultState());

  useEffect(() => {
    // console.log(stats);
    if (stats) {
      // let state = getDefaultState();
      // state.series[0].data = stats;
      // setChartState(state);
    }
  }, [stats]);
  // marginLeft: '-15px'
  return (
    <div style={{}}>
      <Chart options={_chartState.options as any} series={_chartState.series as any} type="bar" height={200} />
    </div>
  );
};

export default SeriesFrequency;
