import React, { useCallback } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { ComplexRoute } from '../../models';
import EnhancedRoute from './Enhanced/Enhanced.route';


type RoutesProps = {
  routes: ComplexRoute[];
};

const Routes: React.FC<RoutesProps> = ({ routes }) => {
  const renderRoutes = useCallback(
    (routes: ComplexRoute[]) =>
      routes.map(({ path, index, routes: nestedRoutes, children, caseSensitive, ...rest }, ind) => {
        const element = <EnhancedRoute {...rest} />;

        return index ? (
          <Route key={ind} index element={element} />
        ) : (
          <Route key={ind} path={path} caseSensitive={caseSensitive} element={element}>
            {nestedRoutes ? renderRoutes(nestedRoutes) : children}
          </Route>
        );
      }),
    []
  );

  return <ReactRoutes>{renderRoutes(routes)}</ReactRoutes>;
};

export default Routes;