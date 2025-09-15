import { type unstable_RSCRouteConfig as RSCRouteConfig } from 'react-router';

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
        },
        {
          id: 'history',
          path: 'history',
          lazy: () => import('./history/route'),
        },
        {
          id: 'rest',
          path: 'rest',
          lazy: () => import('./rest/route'),
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
