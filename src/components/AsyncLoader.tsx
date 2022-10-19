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
    // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 17 ~ initializeApplicationData ~ historicalData', historicalData);

    if (historicalData === null) {
      historicalData = await getHistoricalData();
      // if (historicalData.length > 0) {
      // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 23 ~ initializeApplicationData ~ historicalData', historicalData);
      if (historicalData.length > 0) {
        set('historical-data-mega', historicalData);
      }

      // }
    }
    // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 14 ~ setupHistoricalDataStorage ~ historicalData', historicalData);
    if (state.historicalData.length === 0 && historicalData.length > 0) {
      dispatch({
        type: ActionType.UPDATE_HISTORICAL_DATA,
        historicalData,
      });
      let initResults = await RuleEngineClient.instance.initializeRuleEngine(historicalData);
      dispatch({
        type: ActionType.UPDATE_CHANCES,
        initialChances: initResults?.cacheSize,
        finalChances: initResults?.cacheSize,
      });
    }
  }, []);

  useEffect(() => {
    initializeApplicationData();
  }, [initializeApplicationData]);
  return <></>;
};

export default AsyncLoader;
