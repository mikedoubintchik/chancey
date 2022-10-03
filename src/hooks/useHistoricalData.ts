import { db, functions } from 'config/firebase';

import { collection, doc, getDocs, setDoc, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
import { httpsCallable } from 'firebase/functions';
import axios from 'axios';
import { LotteryDataUtils } from 'utils/lottery-utils';
import { get } from 'stores/IonicStorage';
export function useHistoricalData() {
  const getLatestMegaResults = async () => {
    try {
      // const { data } = await httpsCallable(functions, 'updateRemoteWithMegaData')();

      const historicalDataRef = collection(db, 'historical-data-' + DrawType.MEGA);
      const queryLatest = query(historicalDataRef, orderBy('date', 'desc'), limit(1));
      const res = await getDocs(queryLatest);
      if (res.empty) {
        console.log('getLatestMegaResults - no matching documents.');
        return undefined;
      } else {
        let data = res.docs[0].data();
        //console.log(data);
        return {
          type: DrawType.MEGA,
          date: data.date.toDate(),
          series: {
            numbers: data.series.numbers,
            extra: data.series.extra,
          },
        } as LotteryDrawModel;
      }
    } catch ({ code, message, details }) {
      console.error(code, message, details);
    }
  };

  const getHistoricalData = async (tryCacheFirst = true): Promise<Array<LotteryDrawModel>> => {
    if (tryCacheFirst) {
      var data = await get('historical-data-mega');
      if (data.length) {
        console.log('loaded history from cache');
        return data;
      }
    }

    const historicalDataRef = collection(db, 'historical-data-' + DrawType.MEGA);
    const queryLatest = query(historicalDataRef, orderBy('date', 'desc'), limit(400));
    const res = await getDocs(queryLatest);
    const historicalData: Array<LotteryDrawModel> = [];
    if (res.empty) {
      console.log('getHistoricalData - no matching documents.');
    } else {
      res.docs.forEach((doc) => {
        let data = doc.data();
        // console.log(data);
        historicalData.push({
          type: DrawType.MEGA,
          date: data.date.toDate(),
          series: {
            numbers: data.series.numbers,
            extra: data.series.extra,
          },
        } as LotteryDrawModel);
      });
    }
    // console.log(historicalData);
    return historicalData;
  };

  return {
    getHistoricalData,
    getLatestMegaResults,
  };
}
