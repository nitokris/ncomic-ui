<script setup lang="ts">

import WorkCover from "components/WorkCover.vue";
import {api} from "boot/axios";
import {computed, ref, watch} from "vue";

defineOptions({
  name: "WorkCard",
})

const props = defineProps({
  workid: String,
  mode: String,
});

const metadata = ref({
  id: props.workid,
  circle: {}
});

// 方法区
function requestMetadata() {
  if (props.workid) {
    api.get(`/work/${props.workid}`).then((response) => {
      metadata.value = response.data.data;
    })
  }
}

watch(() => props.workid, (oldWorkId, newWorkId) => {
  requestMetadata();
});

// 创建前调用
requestMetadata();

const apiUrl = computed(() => {
  return api.getUri();
})
</script>

<template>
  <q-card>
    <router-link to="/">
      <!--封面，原则上点击可以跳转到详细页面，但暂时不做-->
      <work-cover :url="`${apiUrl}/attachment/${metadata.cover}`" :id="233" :nsfw="true" :release="metadata.release"/>
      <!--标题-->
      <div class="q-mx-sm text-h6 text-weight-regular ellipsis-2-lines">
        <router-link :to="`/work/${metadata.id}`" class="text-black">
          {{ metadata.title }}
        </router-link>
      </div>

      <!-- 社团 -->
      <div class="q-ml-sm q-mt-sm q-mb-xs text-subtitle1 text-weight-regular ellipsis">
        <a href="javascript:void(0);" class="text-grey">
          {{ metadata.circle?.name }}
        </a>
      </div>

      <!-- 标签 -->
      <div class="q-ma-xs">
        <template v-for="(tag,index) in metadata.tags" :key="index">
          <q-chip size="md" class="shadow-2">
            {{ tag.name }}
          </q-chip>
        </template>
      </div>

      <!--作者-->
      <div class="q-mx-xs q-my-sm">
        <template v-for="(author, index) in metadata.authors" :key="index">
          <q-chip square size="md" class="shadow-2" color="teal" text-color="white">
            {{ author.name }}
          </q-chip>
        </template>
      </div>
    </router-link>
  </q-card>
</template>

<style scoped>

</style>
