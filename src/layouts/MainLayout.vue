<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>
        <q-toolbar-title>
          NComic
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered :breakpoint="239" :width="239">
      <q-list>
        <q-item-label header>
          系统功能
        </q-item-label>
        <q-item v-for="(item,index) in menus" :key="index" :to="item.url">
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="q-layout-padding" style="padding-top: 50px; padding-bottom: 0px;">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';

defineOptions({
  name: 'MainLayout'
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const menus = [
  {
    url: '/recent',
    title: 'Recent',
  },
  {
    url: '/addWork',
    title: 'Add',
  },
  {
    url: '/tag',
    title: 'Label',
  },
  {
    url: '/works',
    title: 'Works',
  },
  {
    url: '/addCircle',
    title: 'Add Circle',
  },
  {
    url: '/addAuthor',
    title: 'Add Author',
  },
  {
    url: '/addTag',
    title: 'Add Tag',
  }
]


</script>
