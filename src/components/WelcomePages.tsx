// WelcomePages.tsx
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import WelcomePageLogin from 'components/welcome/WelcomePageLogin';
import WelcomePageLogo from 'components/welcome/WelcomePageLogo';
import WelcomePageLuckyToken from 'components/welcome/WelcomePageLuckyToken';
import WelcomePageName from 'components/welcome/WelcomePageName';

const WelcomePages: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/logo`} component={WelcomePageLogo} />
      <Route exact path={`${path}/name`} component={WelcomePageName} />
      <Route exact path={`${path}/lucky-token`} component={WelcomePageLuckyToken} />
      <Route exact path={`${path}/login`} component={WelcomePageLogin} />
    </Switch>
  );
};

export default WelcomePages;
