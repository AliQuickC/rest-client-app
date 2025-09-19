import type { unstable_RSCRouteConfig as RSCRouteConfig } from 'react-router';

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
          id: 'login',
          path: 'login',
          lazy: () => import('./login/route'),
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
          path: 'rest/:method?/:encodedEndpoint?/:encodedBody?',
          lazy: () => import('./rest/route'),
        },
      ],
    },
  ] satisfies RSCRouteConfig;
}
