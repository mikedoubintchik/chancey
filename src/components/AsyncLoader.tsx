import { getPlatforms } from '@ionic/react';
import { messaging } from 'config/firebase';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { useNativePushNotification } from 'hooks/useNativePushNotifications';
import { useCallback, useEffect, useState } from 'react';
import { createIonicStore, get, set } from 'stores/IonicStorage';
import { ActionType, useStore } from 'stores/store';

const AsyncLoader: React.FC = () => {
  const { state, dispatch } = useStore();
  const { getHistoricalData } = useHistoricalData();
  const { setupPushNotificationsForMobile, setupPushNotificationsForWeb } = useNativePushNotification();

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

  useEffect(() => {
    if (getPlatforms().includes('desktop') && messaging) {
      setupPushNotificationsForWeb(messaging);
    }

    if (getPlatforms().includes('mobile')) {
      setupPushNotificationsForMobile();
    }
  }, [setupPushNotificationsForWeb, setupPushNotificationsForMobile]);

  return <></>;
};

export default AsyncLoader;
