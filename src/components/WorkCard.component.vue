<script setup lang="ts">

import WorkCover from "components/WorkCover.component.vue";
import {ref, watch} from "vue";
import {Work} from "src/models";
import {apiClient} from "src/api-client";

defineOptions({
  name: "WorkCard",
})

const props = defineProps({
  workid: String,
  mode: String,
});

const metadata = ref<Work>();

async function requestMetadata() {
  if (props.workid) {
    const work = await apiClient.works.fetchWork(props.workid)
    metadata.value = work
  }
}

watch(() => props.workid, (oldWorkId, newWorkId) => {
  requestMetadata();
});

// 创建前调用
requestMetadata();

</script>

<template>
  <q-card>
    <router-link to="/">
      <!--封面，原则上点击可以跳转到详细页面，但暂时不做-->
      <work-cover :id="metadata?.id" :nsfw="true"
                  :release="metadata?.release"/>
      <!--标题-->
      <div class="q-mx-sm text-h6 text-weight-regular ellipsis-2-lines">
        <router-link :to="`/work/${metadata?.id}`" class="text-black">
          {{ metadata?.title }}
        </router-link>
      </div>

      <!-- 社团 -->
      <div class="q-ml-sm q-mt-sm q-mb-xs text-subtitle1 text-weight-regular ellipsis">
        <a href="javascript:void(0);" class="text-grey">
          {{ metadata?.circle?.name }}
        </a>
      </div>

      <!-- 标签 -->
      <div class="q-ma-xs">
        <template v-for="(tag,index) in metadata?.tags" :key="index">
          <q-chip size="md" class="shadow-2">
            {{ tag.name }}
          </q-chip>
        </template>
      </div>

      <!--作者-->
      <div class="q-mx-xs q-my-sm">
        <template v-for="(author, index) in metadata?.authors" :key="index">
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
