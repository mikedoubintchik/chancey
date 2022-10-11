import StatsFrame, { StatsFrameMode } from 'components/stats/stats-frame/StatsFrame';
import { useEffect, useState } from 'react';
import './NumberRanges.css';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { LotteryDrawModel } from 'types/lottery-draw';
import Chart from 'react-apexcharts';
import { quantile, minSorted, maxSorted } from 'simple-statistics';

interface NumberRangesProps {
  showLast: number;
}

const getDefaultState = () => {
  return {
    series: [
      {
        data: [{}],
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
const NumberRanges: React.FC<NumberRangesProps> = ({ showLast }) => {
  const [_mode, setMode] = useState<StatsFrameMode>(StatsFrameMode.DISPLAY);
  const [_chartState, setChartState] = useState(getDefaultState());
  const { getHistoricalData } = useHistoricalData();
  // console.log('refreshing numbers freq');

  const updateStats = (data: LotteryDrawModel[]) => {
    let ranges = new Array(data[0].series.numbers.length).fill([0, 0, 0, 0, 0]);
    const latestData = data.slice(0, showLast);
    ranges = ranges.map((item, index) => {
      let numbers: Array<number> = latestData.map((ldm) => ldm.series.numbers[index]);
      numbers = numbers.sort((a, b) => a - b);
      let quantiles: Array<number> = quantile(numbers, [0.25, 0.5, 0.75]);
      quantiles.splice(0, 0, minSorted(numbers));
      quantiles.push(maxSorted(numbers));
      return quantiles;
    });

    let state = getDefaultState();
    state.series[0].data = ranges.map((item, index) => {
      return { x: `Ball ${index + 1}`, y: item };
    });

    setChartState(state);
    // console.log(frequencies);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoricalData(true);
      updateStats(data);
    };
    fetchData().catch(console.error);
  }, [showLast]);

  const onModeChangeRequest = (mode: StatsFrameMode) => {
    // console.log('onModeChangeRequest');
    setMode(mode);
  };
  return (
    <StatsFrame
      title="Number Ranges"
      mode={_mode}
      displayComponent={
        <Chart options={_chartState.options as any} series={_chartState.series as any} type="boxPlot" height={400} />
      }
      infoComponent={<div>info</div>}
      editComponent={<div>edit</div>}
      onModeChangeRequest={(mode: StatsFrameMode) => {
        onModeChangeRequest(mode);
      }}
    ></StatsFrame>
  );
};

export default NumberRanges;
