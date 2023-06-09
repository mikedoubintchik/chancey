import { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useStore } from 'stores/store';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { state } = useStore();
  const history = useHistory();

  const isAuthenticated = state.user?.uid;

  useEffect(() => {
    if (state.welcomeFinished && !isAuthenticated) history.push('/welcome/login');
    if (!state.welcomeFinished && !isAuthenticated) history.push('/welcome/name');
  }, [isAuthenticated, history, state.welcomeFinished]);

  return isAuthenticated ? <Route {...rest} render={(props) => <Component {...props} />} /> : null;
};

export default ProtectedRoute;
