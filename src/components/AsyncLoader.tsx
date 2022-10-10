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

  const initializeApplicationData = useCallback(async () => {
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
    }
  }, [getHistoricalData, dispatch, state]);

  useEffect(() => {
    initializeApplicationData();
  }, [initializeApplicationData]);
  return <></>;
};

export default AsyncLoader;
