import { IonContent, IonItem, IonRefresher, IonRefresherContent } from '@ionic/react';

import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { set } from 'stores/IonicStorage';
import { LotteryDrawModel } from 'types/lottery-draw';

const HistoryPage: React.FC = () => {
  // const { getHistoricalData } = useFirebase();
  const [latestResults, setLatestResults] = useState<Array<LotteryDrawModel>>([]);
  const { getHistoricalData } = useHistoricalData();
  const refresh = async () => {
    // await updateRemoteWithMegaData();
    const historicalData = await getHistoricalData(false);
    set('historical-data-mega', historicalData);
    setLatestResults(historicalData);
  };
  // TODO: fix any
  // refresh historical data every 10 seconds
  const refreshHistoricalData = (e: any) => {
    // console.log('refreshing historical data');
    refresh();

    setTimeout(() => {
      e.detail.complete();
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoricalData();
      setLatestResults(data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refreshHistoricalData}>
          <IonRefresherContent />
        </IonRefresher>
        <Virtuoso
          style={{ height: '100%' }}
          totalCount={latestResults.length}
          itemContent={(index) => {
            return (
              <IonItem>
                <LotteryDraw draw={latestResults[index]} />
              </IonItem>
            );
          }}
        />
      </IonContent>
    </>
  );
};

export default HistoryPage;
