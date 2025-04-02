import { FC, ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';

export type EnhancedRouteProps = {
  authorized?: boolean;
  onlyPublic?: boolean;
  labelString?: string;
  element: FC | ReactNode;
};

export type ComplexRoute = EnhancedRouteProps &
  Omit<RouteProps, 'element'> & {
    routes?: ComplexRoute[];
  };