import React, { useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../../subrouters/Auth/providers/Auth/Auth.context';
import { EnhancedRouteProps } from '../../../models';


const EnhancedRoute: React.FC<EnhancedRouteProps> = (props) => {
  const { authorized = false, onlyPublic = false, element } = props;
  const { isLoggedIn } = useContext(AuthContext);
  const { pathname } = useLocation();

  const finalRoute = useMemo(() => {
    if (authorized && !isLoggedIn) {
      return <Navigate to={{ pathname: '/auth/login' }} state={{ from: pathname }} replace />;
    }

    if (onlyPublic && isLoggedIn) {
      return <Navigate to="/" />;
    }

    if (typeof element === 'function') {
      const Component = element;
      return <Component />;
    }

    return element as React.ReactElement;
  }, [authorized, onlyPublic, isLoggedIn, pathname, element]);

  return finalRoute;
};

export default EnhancedRoute;