import { Capacitor } from '@capacitor/core';
import { messaging } from 'config/firebase';
import { useHistoricalData } from 'hooks/useHistoricalData';
import { useNativePushNotification } from 'hooks/useNativePushNotifications';
import { useCallback, useEffect } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { createIonicStore, get, set } from 'stores/IonicStorage';
import { ActionType, useStore } from 'stores/store';
import GlassfyService from 'services/glassfy';

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

  const initializeGlassify = useCallback(async () => {
    const Glassfy = new GlassfyService();

    const offerings = Glassfy.getOfferings();
    console.log('🚀 ~ file: AsyncLoader.tsx ~ line 51 ~ initializeGlassify ~ offerings', offerings);
    const user = Glassfy.user;
    console.log('🚀 ~ file: AsyncLoader.tsx ~ line 53 ~ initializeGlassify ~ user', user);
  }, []);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeGlassify();
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
