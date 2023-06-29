import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, homeOutline, infiniteOutline, person, statsChart } from 'ionicons/icons';
import GeolocationPage from 'pages/GeolocationPage';
import HomePage from 'pages/HomePage';
import StatsPage from 'pages/StatsPage';
import { Redirect, Route } from 'react-router-dom';
import { get } from 'stores/IonicStorage';
import { AppContext, IReducer, InitialStateType, initialState, reducer } from 'stores/store';

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
import WelcomePageLogin from 'components/welcome/WelcomePageLogin';
import WelcomePageLogo from 'components/welcome/WelcomePageLogo';
import WelcomePageLuckyToken from 'components/welcome/WelcomePageLuckyToken';
import WelcomePageName from 'components/welcome/WelcomePageName';
import useGuidedTour from 'hooks/useGuidedTour';
import RulesPage from 'pages/RulesPage';
import ValidateScanPage from 'pages/ValidateScanPage';
import { Reducer, useEffect, useReducer, useState } from 'react';
import Joyride from 'react-joyride';
import './App.css';
import './theme/variables.css';
import './theme/global-styles.css';

library.add(fab);

setupIonicReact();

const App: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<InitialStateType, IReducer>>(reducer, initialState);
  const { handleCallback, run, steps, stepIndex } = useGuidedTour();
  const [showFooterTabs, setShowFooterTabs] = useState<boolean>(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const welcomeFinished = await get('welcomeFinished');
      setRedirectTo(welcomeFinished ? '/home' : '/welcome/logo');

      // if not welcome screens or login page or base route, show footer tabs
      if (!window.location.pathname.includes('welcome') && !(window.location.pathname === '/') && state.welcomeFinished)
        setShowFooterTabs(true);
    })();
  }, [state]);

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

        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                {redirectTo && <Redirect to={redirectTo} />}
              </Route>
              <Route exact path="/welcome/logo">
                <WelcomePageLogo />
              </Route>
              <Route exact path="/welcome/name">
                <WelcomePageName />
              </Route>
              <Route exact path="/welcome/lucky-token">
                <WelcomePageLuckyToken />
              </Route>
              <Route exact path="/welcome/login">
                <WelcomePageLogin />
              </Route>
              {/* <ProtectedRoute exact path="/home" component={HomePage} /> */}
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/stats">
                <StatsPage />
              </Route>
              <Route exact path="/geolocation">
                <GeolocationPage />
              </Route>
              <Route exact path="/validate-scan">
                <ValidateScanPage />
              </Route>
              <Route exact path="/stats">
                <StatsPage />
              </Route>
              <Route exact path="/rules">
                <RulesPage />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="app-tab-bar" style={{ display: showFooterTabs ? 'flex' : 'none' }}>
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
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
