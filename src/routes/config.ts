import {
  redirect,
  type unstable_RSCRouteConfig as RSCRouteConfig,
} from 'react-router';
import { auth } from '../config/firebase';

const protectedLoader = () => {
  if (!auth.currentUser) {
    throw redirect('/');
  }
  return null;
};

export function routes() {
  return [
    {
      id: 'root',
      path: '',
      lazy: () => import('./root/route'),
      children: [
        {
          id: 'home',
          index: true,
          lazy: () => import('./home/route'),
        },
        {
          id: 'signUp',
          path: 'signUp',
          lazy: () => import('./signUp/route'),
        },
        {
          id: 'variables',
          path: 'variables',
          lazy: () => import('./variables/route'),
          loader: protectedLoader,
        },
        {
          id: 'history',
          path: 'history',
          lazy: () => import('./history/route'),
          loader: protectedLoader,
        },
        {
          id: 'rest',
          path: 'rest',
          lazy: () => import('./rest/route'),
          loader: protectedLoader,
        },
        {
          id: 'signin',
          path: 'signIn',
          lazy: () => import('./signIn/route'),
        },
      ],
    },
  ] satisfies RSCRouteConfig;
}
