import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, homeOutline, infiniteOutline, person, statsChart } from 'ionicons/icons';
import GeolocationPage from 'pages/GeolocationPage';
import HomePage from 'pages/HomePage';
import ScanTicket from 'pages/ScanTicket';
import StatsPage from 'pages/StatsPage';
import { Route } from 'react-router-dom';
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
import AsyncLoader from 'components/AsyncLoader';
import useGuidedTour from 'hooks/useGuidedTour';
import RulesPage from 'pages/RulesPage';
import { Reducer, useEffect, useReducer } from 'react';
import Joyride from 'react-joyride';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import './theme/variables.css';

library.add(fab);

setupIonicReact();

const App: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<InitialStateType, IReducer>>(reducer, initialState);
  const { handleCallback, run, steps, stepIndex } = useGuidedTour();

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {/* splash */}
      <IonApp>
        <AsyncLoader />
        <Joyride
          callback={handleCallback}
          continuous
          run={run}
          // stepIndex={stepIndex}
          steps={steps}
          styles={
            {
              // options: {
              //   arrowColor: theme.black,
              //   backgroundColor: theme.black,
              //   primaryColor: theme.colors.purple,
              //   textColor: theme.white,
              // },
            }
          }
        />
        <WelcomePage />

        {/* Check if should show welcome page in some other way */}
        {!window.location.pathname.includes('/welcome') && (
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
              </IonRouterOutlet>
              <IonTabBar slot="bottom" class="app-tab-bar">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={homeOutline} />
                </IonTabButton>
                <IonTabButton tab="stats" href="/stats">
                  <IonIcon icon={statsChart} />
                </IonTabButton>
                <IonTabButton tab="rules" href="/rules">
                  <IonIcon
                    icon={infiniteOutline}
                    style={{ border: '1px solid', borderRadius: '100%', padding: '10px' }}
                  />
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
        )}
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
