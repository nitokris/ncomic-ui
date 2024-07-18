<script setup lang="ts">

import {CoverInfo} from "components/models";
import {useQuasar} from "quasar";
import {computed, ref} from "vue";

interface CoverProps extends CoverInfo {
  nsfw: boolean;
}

const prop = defineProps<CoverProps>()

const blurFlag = ref(true);

const imgClass = computed(() => {
  const $q = useQuasar();
  if ($q.platform.is.mobile) {
    // 在移动设备上图片直接显示
    return "";
  } else {
    if (!prop.nsfw) {
      // 在PC上SFW的图片直接显示
      return ""
    } else {
      // 在PC上NSFW的图片鼠标悬停显示
      return blurFlag ? "blur-image" : "";
    }
  }
})

const coverUrl = computed(() => {
  // return prop.id ? `/api/attachment/${prop.id}` : prop.url;
  return prop.url;
})

</script>

<template>
  <q-img fit="cover" :src="coverUrl"
         :img-class="imgClass"
         translate="fade"
         style="max-width: 560px"
         :ratio="4/3"
  >
    <div class="absolute-top-left transparent" style="padding: 0;">
      <q-chip dense square color="brown" text-color="white" class="q-ma-sm">
        23333
      </q-chip>
      <!--      <template v-for="(item,index) in prop.otherSites" :key="index">-->
      <!--        <q-chip dense square color="brown" text-color="white" class="q-ma-sm">-->
      <!--          {{ item.name }}-->
      <!--        </q-chip>-->
      <!--      </template>-->
    </div>
    <div class="absolute-bottom-right" style="padding: 5px;">
      {{ prop.release }}
    </div>
  </q-img>
</template>

<style scoped>

</style>
