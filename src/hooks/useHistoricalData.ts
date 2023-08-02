import { db } from 'config/firebase';

import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { DrawType, LotteryDrawModel } from 'types/lottery-draw';

import { get } from 'stores/IonicStorage';
import { arrayToBitMask } from 'utils/lottery-utils';
import { ActionType, useStore } from 'stores/store';

export class HistoricalDataUtils {
  static getLatestMegaResults = async () => {
    try {
      const historicalDataRef = collection(db, 'historical-data-' + DrawType.MEGA);
      const queryLatest = query(historicalDataRef, orderBy('date', 'desc'), limit(1));
      const res = await getDocs(queryLatest);
      if (res.empty) {
        // console.log('getLatestMegaResults - no matching documents.');
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
      console.error('error / getLatestMegaResults', code, message, details);
    }
  };

  static getHistoricalData = async (tryCacheFirst = true): Promise<Array<LotteryDrawModel>> => {
    if (tryCacheFirst) {
      const data = await get('historical-data-mega');
      if (data?.length) {
        // console.log('loaded history from cache');
        return data;
      }
    }

    const historicalDataRef = collection(db, 'historical-data-' + DrawType.MEGA);
    const queryLatest = query(historicalDataRef, orderBy('date', 'desc'), limit(400));
    const res = await getDocs(queryLatest);
    const historicalData: Array<LotteryDrawModel> = [];
    if (res.empty) {
      // console.log('getHistoricalData - no matching documents.');
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
            bitMask: arrayToBitMask(data.series.numbers),
          },
        } as LotteryDrawModel);
      });
    }

    return historicalData;
  };
}

export function useHistoricalData() {
  const { dispatch } = useStore();

  const getLatestMegaResults = async () => {
    try {
      // const { data } = await httpsCallable(functions, 'updateRemoteWithMegaData')();

      const historicalDataRef = collection(db, 'historical-data-' + DrawType.MEGA);
      const queryLatest = query(historicalDataRef, orderBy('date', 'desc'), limit(1));
      const res = await getDocs(queryLatest);
      if (res.empty) {
        // console.log('getLatestMegaResults - no matching documents.');
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
      console.error('error / getLatestMegaResults', code, message, details);
    }
  };

  const getHistoricalData = async (tryCacheFirst = true): Promise<Array<LotteryDrawModel>> => {
    if (tryCacheFirst) {
      const data = await get('historical-data-mega');
      if (data?.length) {
        // console.log('loaded history from cache');
        return data;
      }
    }

    const historicalDataRef = collection(db, 'historical-data-' + DrawType.MEGA);
    const queryLatest = query(historicalDataRef, orderBy('date', 'desc'), limit(400));
    const res = await getDocs(queryLatest);
    const historicalData: Array<LotteryDrawModel> = [];
    if (res.empty) {
      // console.log('getHistoricalData - no matching documents.');
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
            bitMask: arrayToBitMask(data.series.numbers),
          },
        } as LotteryDrawModel);
      });
    }

    return historicalData;
  };

  return {
    getHistoricalData,
    getLatestMegaResults,
  };
}
