import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'recent', component: () => import('pages/RecentPage.vue')},
      {path: 'addWork', component: () => import('pages/AddWorkPage.vue')},
      {path: 'tag', component: () => import('pages/Labels.vue')},
      {path: 'works', component: () => import('pages/WorkList.vue')},
      {path: 'addCircle', props: {restrict: 'group'}, component: () => import('pages/AddLabel.vue')},
      {path: 'addAuthor', props: {restrict: 'author'}, component: () => import('pages/AddLabel.vue')},
      {path: 'addTag', props: {restrict: 'tag'}, component: () => import('pages/AddLabel.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
