import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, homeOutline, person, statsChart } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import GeolocationPage from 'pages/GeolocationPage';
import HomePage from 'pages/HomePage';
import ScanTicket from 'pages/ScanTicket';
import StatsPage from 'pages/StatsPage';
import { AppContext, initialState, InitialStateType, IReducer, reducer } from 'stores/store';
import { createIonicStore, get, set, setObject } from 'stores/IonicStorage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';

import HistoryPage from 'pages/HistoryPage';
import { Reducer, useCallback, useEffect, useReducer } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'config/firebase';

library.add(fab);

setupIonicReact();

const App: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<InitialStateType, IReducer>>(reducer, initialState);

  const getHistoricalData = async () => {
    const colRef = collection(db, 'historicalData');
    const result = await getDocs(colRef);
    // TODO: fix any
    const historicalData: any = [];
    result.forEach((doc) =>
      historicalData.push({
        [doc.id]: doc.data(),
      }),
    );
    return historicalData;
  };

  const setupHistoricalDataStorage = useCallback(async () => {
    await createIonicStore('HistoricalLotteryData');
    const exists = await get('historicalData');

    if (!exists) {
      // initialize store
      const historicalData = await getHistoricalData();
      set('historicalData', historicalData);
    }
  }, []);

  useEffect(() => {
    setupHistoricalDataStorage();
  }, [setupHistoricalDataStorage]);

  // TODO: fix any
  const refreshHistoricalData = (e: any) => {
    resetHistoricalDataStorage();

    setTimeout(() => {
      e.detail.complete();
    }, 10000);
  };

  const resetHistoricalDataStorage = async () => set('historicalData', await getHistoricalData());

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <IonRefresher slot="fixed" onIonRefresh={refreshHistoricalData}>
        <IonRefresherContent>refreshing historical data...</IonRefresherContent>
      </IonRefresher>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/history">
              <HistoryPage />
            </Route>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home">
                  <HomePage />
                </Route>
                <Route exact path="/stats">
                  <StatsPage />
                </Route>
                <Route path="/geolocation">
                  <GeolocationPage />
                </Route>
                <Route path="/scan">
                  <ScanTicket />
                </Route>
                <Route path="/stats">
                  <StatsPage />
                </Route>

                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={homeOutline} />
                  {/* <IonLabel>Home</IonLabel> */}
                </IonTabButton>
                <IonTabButton tab="stats" href="/stats">
                  <IonIcon icon={statsChart} />
                  {/* <IonLabel>Tab 2</IonLabel> */}
                </IonTabButton>

                <IonTabButton tab="geolocation" href="/geolocation">
                  <IonIcon icon={person} />
                  <IonLabel>Geolocation</IonLabel>
                </IonTabButton>
                <IonTabButton tab="scan" href="/scan">
                  <IonIcon icon={camera} />
                  <IonLabel>Scan Ticket</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
