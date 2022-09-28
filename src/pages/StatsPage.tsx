import {
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from 'components/Header';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import SideMenu from 'components/SideMenu';

import Chart from 'react-apexcharts';

const StatsPage: React.FC = () => {
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
  };
  return (
    <>
      <SideMenu />
      <IonPage>
        <Header />
        <IonToolbar>
          <IonSelect onIonChange={handleChage} interface="popover" placeholder="Recent Drawings" value="10">
            <IonSelectOption value="10">Last 10 Drawings</IonSelectOption>
            <IonSelectOption value="50">Last 50 Drawings</IonSelectOption>
            <IonSelectOption value="100">Last 100 Drawings</IonSelectOption>
          </IonSelect>
        </IonToolbar>

        <IonContent fullscreen>
          <IonCard>
            <Chart options={state.options as any} series={state.series} type="boxPlot" height={350} />
          </IonCard>
          {/* <Bar data={data} options={options} /> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default StatsPage;
