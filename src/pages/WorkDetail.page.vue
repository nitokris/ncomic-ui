<script setup lang="ts">

import WorkCover from 'src/components/WorkCover.component.vue';
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import {apiClient} from "src/api-client";
import {Work} from "src/models";

const route = useRoute();
const metadata = ref<Work>()


async function fetchItem() {
  let resp = await apiClient.works.fetchWork(route.params.id)
  console.error(route.params.id)
  metadata.value = resp.data;
}

fetchItem()

watch(() => route.params.id, async () => {
  await fetchItem();
});

</script>

<template>

  <q-page class="q-layout-padding">
    <q-card>
      <div class="row">
        <div class="col-sm-4">
          <work-cover :src="metadata?.cover" :release="metadata?.release"></work-cover>
        </div>
        <div class="col-sm-8 q-pa-sm">
          <q-item-section>
            <q-item-label class="text-h6">
              {{ metadata?.title }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="col-auto text-subtitle1 text-weight-regular ellipsis text-gray">
              {{ metadata?.circle?.name }}
            </q-item-label>
          </q-item-section>

        </div>
      </div>
    </q-card>
  </q-page>

</template>

<style>
.text-gray {
  color: #9e9e9e !important;
}
</style>
