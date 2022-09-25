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

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// import './Tab1.css';
export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Some stats and shit',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => -200),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 200),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const StatsPage: React.FC = () => {
  const handleChage = (event: any) => {
    console.log(event.detail.value);
  };
  return (
    <IonPage>
      <IonToolbar>
        <IonSelect onIonChange={handleChage} interface="popover" placeholder="Recent Drawings" value={'10'}>
          <IonSelectOption value="10">Last 10 Drawings</IonSelectOption>
          <IonSelectOption value="50">Last 50 Drawings</IonSelectOption>
          <IonSelectOption value="100">Last 100 Drawings</IonSelectOption>
        </IonSelect>
      </IonToolbar>

      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <Bar data={data} options={options} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default StatsPage;
