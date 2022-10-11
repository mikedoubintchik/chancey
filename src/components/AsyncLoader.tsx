import { useHistoricalData } from 'hooks/useHistoricalData';
import { useCallback, useEffect } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { getRulesBank } from 'rules/RuleUtils';
import { createIonicStore, get, set } from 'stores/IonicStorage';
import { ActionType, useStore } from 'stores/store';

const AsyncLoader: React.FC = () => {
  const { state, dispatch } = useStore();
  // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 8 ~ state', state);
  const { getHistoricalData } = useHistoricalData();

  const initializeApplicationData = useCallback(async () => {
    console.log('Creating ionic store in initializeApplicationData');
    await createIonicStore('historical-data-mega');
    let historicalData = await get('historical-data-mega');

    if (!historicalData) {
      historicalData = await getHistoricalData();
      set('historical-data-mega', historicalData);
    }
    // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 14 ~ setupHistoricalDataStorage ~ historicalData', historicalData);
    if (state.historicalData.length === 0 && historicalData.length > 0) {
      dispatch({
        type: ActionType.UPDATE_HISTORICAL_DATA,
        historicalData,
      });
    }
  }, []);

  useEffect(() => {
    initializeApplicationData();
  }, [initializeApplicationData]);
  return <></>;
};

export default AsyncLoader;
