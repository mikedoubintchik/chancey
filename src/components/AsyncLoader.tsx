import { Capacitor } from '@capacitor/core';
import { messaging } from 'config/firebase';
import { useNativePushNotification } from 'hooks/useNativePushNotifications';
import { useCallback, useEffect } from 'react';
import { ActionType, useStore } from 'stores/store';
import { AsyncLoaderHelper } from './utils/AsyncLoaderHelper';
import config from 'utils/config';

const { FEATURE_PUSH_NOTIFICATIONS } = config;

const AsyncLoader: React.FC = () => {
  const { state, dispatch } = useStore();
  const { setupPushNotificationsForMobile, setupPushNotificationsForWeb } = useNativePushNotification();

  // initialize application data
  const initializeApplicationData = useCallback(async () => {
    //1. initialize glassfy
    Capacitor.isNativePlatform() && (await AsyncLoaderHelper.initializeGlassfy());
    //2. create ionic store
    await AsyncLoaderHelper.initializeAppStore();

    //3. get historical data from api
    let historicalData = await AsyncLoaderHelper.loadHistoricalData();
    dispatch({
      type: ActionType.UPDATE_HISTORICAL_DATA,
      historicalData,
    });

    //4. initialize rule engine
    let initialResults = await AsyncLoaderHelper.initializeRuleEngine(historicalData);
    dispatch({
      type: ActionType.UPDATE_CHANCES,
      initialChances: initialResults?.cacheSize,
      finalChances: initialResults?.cacheSize,
    });

    //5. load historical lucky generated results
    let historicalLuckyGeneratedResults = await AsyncLoaderHelper.loadHistoricalLuckyGeneratedResults();
    if (historicalLuckyGeneratedResults) {
      dispatch({
        type: ActionType.INITIALIZE_LUCKY_GENERATED_RESULT,
        historicalLuckyGeneratedResults,
      });
    }

    //6. update welcome finished state
    let welcomeFinished = await AsyncLoaderHelper.updateWelcomeFinishedState();
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
    if (Capacitor.getPlatform() === 'web' && messaging && FEATURE_PUSH_NOTIFICATIONS) {
      setupPushNotificationsForWeb(messaging);
    }

    if (Capacitor.isNativePlatform() && FEATURE_PUSH_NOTIFICATIONS) {
      setupPushNotificationsForMobile();
    }
  }, [setupPushNotificationsForWeb, setupPushNotificationsForMobile]);

  return <></>;
};

export default AsyncLoader;
