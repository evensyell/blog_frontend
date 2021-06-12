import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/main/Index.vue') },
      { path: '/index', component: () => import('pages/main/Index.vue') },
      {
        path: '/about',
        name: 'about',
        component: () => import('pages/main/About.vue'),
      },
      {
        path: '/articles',
        name: 'articles',
        // props: true,
        component: () => import('pages/main/Articles.vue'),
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import('pages/main/Article.vue'),
      },
      {
        path: '/posts',
        name: 'posts',
        component: () => import('pages/main/Posts.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('pages/user/Admin.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('src/pages/main/Error404.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
]

export default routes
