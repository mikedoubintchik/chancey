import { db, functions } from 'config/firebase';

import { collection, doc, getDocs, setDoc, addDoc } from 'firebase/firestore';
import { DrawType } from 'types/lottery-draw';
import { httpsCallable } from 'firebase/functions';
import axios from 'axios';
import { LotteryDataUtils } from 'utils/lottery-utils';
export function useHistoricalData() {
  const updateRemoteWithMegaData = async () => {
    try {
      // const { data } = await httpsCallable(functions, 'updateRemoteWithMegaData')();
      let megaData = await axios.get('https://data.ny.gov/api/views/5xaw-6ayf/rows.json?accessType=DOWNLOAD');
      let records = megaData.data.data;
      // console.log(records);
      const colRef = collection(db, 'historical-data-' + DrawType.MEGA);
      for (var i = 0; i < records.length; i++) {
        let ldm = LotteryDataUtils.parseMegaRecord(records[i]);
        console.log(ldm);
        const result = await addDoc(colRef, ldm);
      }

      // let axClient = new Axios({ url: 'https://data.ny.gov/api/' });
      // let megaData = await axClient.get('');
      // console.log(megaData);
      // console.log(data);
      //

      // const result = await addDoc(colRef, { test: 5 });
      // console.log(result);
    } catch ({ code, message, details }) {
      console.error(code, message, details);
    }
  };

  const getHistoricalData = async () => {
    const colRef = collection(db, 'historicalData');
    const result = await getDocs(colRef);
    // TODO: fix any
    const historicalData: any = [];
    result.forEach((ticket) =>
      historicalData.push({
        [ticket.id]: ticket.data(),
      }),
    );
    return historicalData;
  };

  return {
    getHistoricalData,
    updateRemoteWithMegaData,
  };
}
