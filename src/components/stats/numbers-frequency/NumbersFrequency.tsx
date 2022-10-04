import StatsFrame, { StatsFrameMode } from 'components/stats/stats-frame/StatsFrame';
import { useEffect, useState } from 'react';
import './NumbersFrequency.css';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { LotteryDrawModel } from 'types/lottery-draw';
import Chart from 'react-apexcharts';

interface NumbersFrequencyProps {
  showLast: number;
}

const getDefaultState = () => {
  return {
    series: [
      {
        name: 'Occurances',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      grid: {
        show: false,
      },
    },
  };
};
const NumbersFrequency: React.FC<NumbersFrequencyProps> = ({ showLast }) => {
  const [_mode, setMode] = useState<StatsFrameMode>(StatsFrameMode.DISPLAY);
  const [_chartState, setChartState] = useState(getDefaultState());
  const { getHistoricalData } = useHistoricalData();
  console.log('refreshing numbers freq');

  const updateStats = (data: LotteryDrawModel[]) => {
    var max = 70;
    var frequencies = new Array(max).fill(0);
    let latestData = data.slice(0, showLast);
    latestData.forEach((ldm) => {
      ldm.series.numbers.forEach((n) => {
        frequencies[n - 1] += 1;
      });
    });
    let decor = (v: number, i: number) => [i, v]; // set index to value

    var sortedFrequencies = frequencies.map(decor).sort((a: number[], b: number[]) => b[1] - a[1]);
    // console.log('f', frequencies);
    var state = getDefaultState();
    state.series[0].data = sortedFrequencies.map((item) => item[1]) as any;

    state.options.xaxis.categories = sortedFrequencies.map((item) => item[0] + 1) as any;

    setChartState(state);
    // console.log(frequencies);
  };

  useEffect(() => {
    const fetchData = async () => {
      var data = await getHistoricalData(true);
      updateStats(data);
    };
    fetchData().catch(console.error);
  }, [showLast]);

  const onModeChangeRequest = (mode: StatsFrameMode) => {
    console.log('onModeChangeRequest');
    setMode(mode);
  };
  return (
    <StatsFrame
      title="Numbers Frequency"
      mode={_mode}
      displayComponent={
        <Chart options={_chartState.options as any} series={_chartState.series} type="bar" height={1000} />
      }
      infoComponent={<div>info</div>}
      editComponent={<div>edit</div>}
      onModeChangeRequest={(mode: StatsFrameMode) => {
        onModeChangeRequest(mode);
      }}
    ></StatsFrame>
  );
};

export default NumbersFrequency;
