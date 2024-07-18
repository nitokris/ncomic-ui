<script setup lang="ts">
import WorkCover from "components/WorkCover.vue";
import {api} from "boot/axios";
import {ref} from "vue";
import NotificationMixins from "src/mixins/NotificationMixins";

defineOptions({
  name: 'RecentPage',
});

interface RecentComicDTO {
  id: number;
  release: string;
  cover: string;
}

const recentWorks = ref<Array<RecentComicDTO>>([]);

function fetchRecent() {
  api.get('/recent').then((response) => {
    recentWorks.value = response.data;
    console.log(recentWorks.value)
  }).catch((error) => {
    NotificationMixins.showErrNotif(error.message);
  })
}

fetchRecent();
</script>

<template>
  <q-page class="q-layout-padding">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-md-8">
        <q-card>
          <q-card-section title>
            <div class="text-h6">最新入库</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <template v-for="(item,index) in recentWorks" :key="index">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-card>
                    <router-link to="">
                      <work-cover :id="item.id" :nsfw="true" :release="item.release"
                                  :url="item.cover"/>
                    </router-link>
                  </q-card>
                </div>
              </template>

            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-4">
        <q-card>
          <q-card-section title>
            <div class="text-h6">仪表盘</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>


</template>

<style scoped>

</style>
