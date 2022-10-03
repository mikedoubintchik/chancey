import { IonCard, IonContent, IonPage, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import Header from 'components/Header';
import NumbersFrequency from 'components/numbers-frequency/NumbersFrequency';

import SideMenu from 'components/SideMenu';
import StatsFrame from 'components/stats-frame/StatsFrame';
import { useState } from 'react';

import Chart from 'react-apexcharts';

const StatsPage: React.FC = () => {
  const [_showLast, setShowLast] = useState(10);
  const state = {
    series: [
      {
        data: [
          {
            x: 'Ball #1',
            y: [54, 66, 69, 75, 88],
          },
          {
            x: 'Ball #2',
            y: [43, 65, 69, 76, 81],
          },
          {
            x: 'Ball #3',
            y: [31, 39, 45, 51, 59],
          },
          {
            x: 'Ball #4',
            y: [39, 46, 55, 65, 71],
          },
          {
            x: 'Ball #5',
            y: [29, 31, 35, 39, 44],
          },
          {
            x: 'Extra Ball',
            y: [41, 49, 58, 61, 67],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: 'boxPlot',
        height: 350,
        toolbar: {
          show: false,
        },
      },

      // title: {
      //   text: 'Horizontal BoxPlot Chart',
      //   align: 'left',
      // },
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

  const handleChage = (event: any) => {
    console.log(event.detail.value);
    setShowLast(parseInt(event.detail.value));
  };
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonToolbar>
          <IonSelect onIonChange={handleChage} interface="popover" placeholder="Recent Drawings" value={_showLast}>
            <IonSelectOption value={10}>Last 10 Drawings</IonSelectOption>
            <IonSelectOption value={50}>Last 50 Drawings</IonSelectOption>
            <IonSelectOption value={100}>Last 100 Drawings</IonSelectOption>
          </IonSelect>
        </IonToolbar>

        <IonContent fullscreen>
          <NumbersFrequency showLast={_showLast}></NumbersFrequency>
          {/* <IonCard>
            <Chart options={state.options as any} series={state.series} type="boxPlot" height={350} />
          </IonCard> */}
          {/* <Bar data={data} options={options} /> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default StatsPage;
