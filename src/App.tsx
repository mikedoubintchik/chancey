import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, diamondOutline, homeOutline, person, statsChart } from 'ionicons/icons';
import GeolocationPage from 'pages/GeolocationPage';
import HomePage from 'pages/HomePage';
import ScanTicket from 'pages/ScanTicket';
import StatsPage from 'pages/StatsPage';
import { Redirect, Route } from 'react-router-dom';
import { AppContext, initialState, InitialStateType, IReducer, reducer } from 'stores/store';
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

import AsyncLoader from 'components/AsyncLoader';
import RulesPage from 'pages/RulesPage';
import { Reducer, useReducer } from 'react';

library.add(fab);

setupIonicReact();

const App: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<InitialStateType, IReducer>>(reducer, initialState);
  // console.log('Initializing app');
  // console.log('returning app component');
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {/* splash */}
      <IonApp>
        <AsyncLoader />
        <IonReactRouter>
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
              <Route path="/rules">
                <RulesPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
              </IonTabButton>
              <IonTabButton tab="stats" href="/stats">
                <IonIcon icon={statsChart} />
              </IonTabButton>
              <IonTabButton tab="rules" href="/rules">
                <IonIcon icon={diamondOutline} style={{ border: '1px solid', borderRadius: '100%', padding: '10px' }} />
              </IonTabButton>
              <IonTabButton tab="geolocation" href="/geolocation">
                <IonIcon icon={person} />
              </IonTabButton>
              <IonTabButton tab="scan" href="/scan">
                <IonIcon icon={camera} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
