import { messaging } from 'config/firebase';
import { onMessage } from 'firebase/messaging';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { useCallback, useEffect } from 'react';
import { getRulesBank } from 'rules/RuleUtils';
import { createIonicStore, get, set } from 'stores/IonicStorage';
import { ActionType, useStore } from 'stores/store';
import { getAllCombinations } from 'utils/combinatorics';
import { Message, MessageType } from 'workers/messages';

const AsyncLoader: React.FC = () => {
  const { state, dispatch } = useStore();
  // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 8 ~ state', state);
  const { getHistoricalData } = useHistoricalData();

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });

  const setupHistoricalDataStorage = useCallback(async () => {
    await createIonicStore('historical-data-mega');
    let historicalData = await get('historical-data-mega');

    if (!historicalData) {
      historicalData = await getHistoricalData();
      set('historical-data-mega', historicalData);
    }
    // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 14 ~ setupHistoricalDataStorage ~ historicalData', historicalData);
    if (state.historicalData.length === 0) {
      dispatch({
        type: ActionType.UPDATE_HISTORICAL_DATA,
        historicalData,
      });
    }
    if (state.rulesBank.length === 0) {
      const rulesBank = getRulesBank(historicalData);
      dispatch({
        type: ActionType.INITIALIZE_RULES_BANK,
        rulesBank,
      });
    }
    if (state.historicalData.length > 0) {
      await state.ruleEngineClient.initializeRuleEngine(state.historicalData);
      // const initRulesEngineListener = (event: any) => {
      //   let m = event.data as Message;
      //   if (m.type === MessageType.INIT_RULE_ENGINE_COMPLETE) {
      //     console.log('Rules engine initialization complete - ', m.data);
      //     state.rulesEngineWorker.removeEventListener('message', initRulesEngineListener);
      //   }
      // };
      // state.rulesEngineWorker.addEventListener('message', initRulesEngineListener);
      // state.rulesEngineWorker.postMessage({
      //   type: MessageType.INIT_RULE_ENGINE,
      //   data: { historicalData: state.historicalData },
      // } as Message);
      // // state.rulesEngineWorker.postMessage({
      // //   type: MessageType.PROCESS_RULE,
      // //   data: { ruleIndex: 0, historicalData: state.historicalData },
      // // } as Message);
    }
  }, [getHistoricalData, dispatch, state]);

  useEffect(() => {
    setupHistoricalDataStorage();
  }, [setupHistoricalDataStorage]);
  return <></>;
};

export default AsyncLoader;
