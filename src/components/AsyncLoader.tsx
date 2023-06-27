import { messaging } from 'config/firebase';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { useNativePushNotification } from 'hooks/useNativePushNotifications';
import { useCallback, useEffect } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { createIonicStore, get, set } from 'stores/IonicStorage';
import { ActionType, Storages, useStore } from 'stores/store';
import { Capacitor } from '@capacitor/core';

const AsyncLoader: React.FC = () => {
  const { state, dispatch } = useStore();
  const { getHistoricalData } = useHistoricalData();
  const { setupPushNotificationsForMobile, setupPushNotificationsForWeb } = useNativePushNotification();

  const initializeApplicationData = useCallback(async () => {
    console.log('Creating ionic store in initializeApplicationData');
    await createIonicStore('app-data');
    let historicalData = await get('app-data');
    // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 17 ~ initializeApplicationData ~ historicalData', historicalData);

    if (historicalData === null) {
      historicalData = await getHistoricalData();
      // if (historicalData.length > 0) {
      // console.log('🚀 ~ file: AsyncLoader.tsx ~ line 23 ~ initializeApplicationData ~ historicalData', historicalData);
      if (historicalData.length > 0) {
        set(Storages.HISTOICAL_DATA_MEGA, historicalData);
      }

      // }
    }

    const historicalLuckyGeneratedResults = await get(Storages.HISTORICAL_LUCKY_GENERATED_RESULTS);

    if (historicalLuckyGeneratedResults) {
      dispatch({
        type: ActionType.INITIALIZE_LUCKY_GENERATED_RESULT,
        historicalLuckyGeneratedResults,
      });
    }

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

    const welcomeFinished = await get('welcomeFinished');

    if (welcomeFinished) {
      dispatch({
        type: ActionType.UPDATE_WELCOME_FINISHED,
        welcomeFinished,
      });
    }
  }, []);

  useEffect(() => {
    initializeApplicationData();
  }, [initializeApplicationData]);

  useEffect(() => {
    if (Capacitor.getPlatform() === 'web' && messaging) {
      setupPushNotificationsForWeb(messaging);
    }

    if (Capacitor.isNativePlatform()) {
      setupPushNotificationsForMobile();
    }
  }, [setupPushNotificationsForWeb, setupPushNotificationsForMobile]);

  return <></>;
};

export default AsyncLoader;
