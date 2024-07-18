<template>
<!--  <q-layout view="hHh Lpr lFf">-->
<!--    <q-header elevated>-->
<!--      <q-toolbar>-->
<!--        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>-->
<!--        <q-toolbar-title>-->
<!--          NComic-->
<!--        </q-toolbar-title>-->
<!--        <div>Quasar v{{ $q.version }}</div>-->
<!--      </q-toolbar>-->
<!--    </q-header>-->

<!--    <q-drawer v-model="leftDrawerOpen" bordered >-->
<!--      <q-list>-->
<!--        <q-item-label header>-->
<!--          系统功能-->
<!--        </q-item-label>-->

<!--      </q-list>-->
<!--    </q-drawer>-->

<!--    <q-page-container>-->
<!--&lt;!&ndash;      <router-view/>&ndash;&gt;-->
<!--    </q-page-container>-->
<!--  </q-layout>-->
  <router-view></router-view>
</template>

<script setup lang="ts">

import {ref} from "vue";

defineOptions({
  name: 'App'
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
