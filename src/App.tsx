import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, ellipse, person, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import GeolocationPage from './pages/GeolocationPage';
import ScanTicket from './pages/ScanTicket';
import { AppContext, initialState, InitialStateType, IReducer, reducer } from './store';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import StatsPage from 'pages/StatsPage';
import HistoryPage from 'pages/HistoryPage';
import LoginPage from 'pages/LoginPage';
import { Reducer, useReducer } from 'react';

library.add(fab);

setupIonicReact();

const App: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<InitialStateType, IReducer>>(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route path="/history">
              <HistoryPage />
            </Route>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home">
                  <Tab1 />
                </Route>
                <Route exact path="/tab2">
                  <Tab2 />
                </Route>
                <Route path="/tab3">
                  <Tab3 />
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
                  <Redirect to="/login" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={triangle} />
                  <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={square} />
                  <IonLabel>Tab 3</IonLabel>
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
