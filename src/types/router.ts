import { RouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

export interface RouteMeta {
  title?: string;
  icon?: ReactNode;
  requiresAuth?: boolean;
  hideInMenu?: boolean;
  roles?: string[];
}

export type AppRouteObject = RouteObject & {
  meta?: RouteMeta;
  children?: AppRouteObject[];
};
