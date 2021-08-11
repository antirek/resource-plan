const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/accounts',
    component: () => import('pages/Accounts.vue'),
    children: [
      {
        path: ':accountId/info',
        component: () => import('pages/AccountInfo.vue'),
        props: true,
      },
      {
        path: 'data',
        component: () => import('pages/AccountData.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error404',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
