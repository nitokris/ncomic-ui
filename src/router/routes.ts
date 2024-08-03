import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'recent', component: () => import('pages/Recent.page.vue')},
      {path: 'addWork', component: () => import('pages/AddWorkPage.vue')},
      {path: 'tag', component: () => import('pages/Labels.page.vue')},
      {path: 'works', component: () => import('pages/WorkList.page.vue')},
      {path: 'addCircle', props: {restrict: 'group'}, component: () => import('pages/AddLabel.vue')},
      {path: 'addAuthor', props: {restrict: 'author'}, component: () => import('pages/AddLabel.vue')},
      {path: 'addTag', props: {restrict: 'tag'}, component: () => import('pages/AddLabel.vue')},
      {path: 'sukebi', component: () => import('pages/SukebeiSearch.page.vue')},
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
