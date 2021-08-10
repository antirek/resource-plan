const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error404',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
