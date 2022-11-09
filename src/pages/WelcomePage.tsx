import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import WelcomePageLogo from 'components/welcome/WelcomePageLogo';
import WelcomePageLuckyToken from 'components/welcome/WelcomePageLuckyToken';
import WelcomePageName from 'components/welcome/WelcomePageName';
import { useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { get } from 'stores/IonicStorage';
import WelcomePageLogin from '../components/welcome/WelcomePageLogin';

const WelcomePage: React.FC = (): React.ReactElement => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  console.log('🚀 ~ file: WelcomePage.tsx ~ line 13 ~ showWelcome', showWelcome);
  const history = useHistory();

  useEffect(() => {
    get('welcomeFinished').then((welcomeFinished) => {
      if (welcomeFinished) setShowWelcome(false);
    });
  }, [history]);

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/welcome/logo">
          {showWelcome && <WelcomePageLogo />}
          {!showWelcome && <Redirect to="/home" />}
        </Route>
        <Route exact path="/welcome/name">
          <WelcomePageName />
        </Route>
        <Route path="/welcome/lucky-token">
          <WelcomePageLuckyToken />
        </Route>
        <Route path="/welcome/login">
          <WelcomePageLogin />
        </Route>
        <Route exact path="/">
          {showWelcome && <Redirect to="/welcome/logo" />}
          {!showWelcome && <Redirect to="/home" />}
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default WelcomePage;
