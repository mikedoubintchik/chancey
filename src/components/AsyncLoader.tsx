import { Capacitor } from '@capacitor/core';
import { Glassfy } from 'capacitor-plugin-glassfy';
import { messaging } from 'config/firebase';
import { HistoricalDataUtils } from 'hooks/useHistoricalData';
import { useNativePushNotification } from 'hooks/useNativePushNotifications';
import { useCallback, useEffect } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { createIonicStore, get, set } from 'stores/IonicStorage';
import { ActionType, Storages, useStore } from 'stores/store';
import { LotteryDrawModel } from 'types/lottery-draw';

class AsyncLoaderHelper {
  //1. initialize glassfy
  static initializeGlassfy = async () => {
    try {
      await Glassfy.initialize({ apiKey: '393489baa5b44bf7a9af2975f6ee2d01', watcherMode: false });
    } catch (e) {
      // initialization error
      console.log('Glassfy Initialization error', e);
    }
  };

  //2. initialize application store
  static initializeAppStore = async () => {
    try {
      await createIonicStore(Storages.APP_DATA);
    } catch (e) {
      // initialization error
      console.log('Ionic Storage Initialization error', e);
    }
  };

  //3. load historical data
  static loadHistoricalData = async () => {
    try {
      let historicalData = await get(Storages.HISTOICAL_DATA_MEGA);
      if (historicalData === null) {
        historicalData = await HistoricalDataUtils.getHistoricalData();
        console.log('historicalData', historicalData);
        if (historicalData.length > 0) {
          set(Storages.HISTOICAL_DATA_MEGA, historicalData);
        }
      }
      return historicalData;
    } catch (e) {
      // initialization error
      console.log('Historical Data Initialization error', e);
    }
  };

  //4. initialize rule engine
  static initializeRuleEngine = async (historicalData: LotteryDrawModel[]) => {
    try {
      let initResults = await RuleEngineClient.instance.initializeRuleEngine(historicalData);

      return initResults;
    } catch (e) {
      // initialization error
      console.log('Rule Engine Initialization error', e);
    }
    return null;
  };

  //5. load historical lucky generated results
  static loadHistoricalLuckyGeneratedResults = async () => {
    try {
      let historicalLuckyGeneratedResults = await get(Storages.HISTORICAL_LUCKY_GENERATED_RESULTS);

      return historicalLuckyGeneratedResults;
    } catch (e) {
      // initialization error
      console.log('Historical Lucky Generated Results Initialization error', e);
    }
    return null;
  };

  //6. update welcome finished state
  static updateWelcomeFinishedState = async () => {
    try {
      return await get('welcomeFinished');
    } catch (e) {
      // initialization error
      console.log('Welcome Finished Initialization error', e);
    }
    return null;
  };
}

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
