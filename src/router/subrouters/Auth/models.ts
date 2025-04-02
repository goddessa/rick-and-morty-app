import { FC, ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';

export type EnhancedRouteProps = {
  authorized?: boolean;
  onlyPublic?: boolean;
} & Omit<RouteProps, 'element'> & {
  element: FC | ReactNode;
};

export type ComplexRoute = EnhancedRouteProps & {
  routes?: ComplexRoute[];
};
