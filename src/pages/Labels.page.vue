<script setup lang="ts">

import {ref} from "vue";

const keyword = ref('')
const props = defineProps({
  restrict: {type: String, required: true}
});

// const filteredItems = ref('');

const items = ref([
  {id: '233', name: '2887', count: 28}
]);

const currentPage = ref(1);

</script>

<template>
  <q-page>
    <div class="text-h5 text-weight-regular q-ma-md">
      All tags
    </div>
    <div class="row justify-center q-pb-xl q-pt-none">
      <div class="col-11">
        <q-input dense rounded outlined v-model="keyword" :placeholder="`Search for a ${restrict}...`" class="q-mb-md">
          <template v-slot:append>
            <q-icon v-if="keyword === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="keyword = ''"/>
          </template>
        </q-input>
        <div class="row justify-center q-gutter-sm">
          <!--(keyword ? filteredItems : items)-->
          <div class="col-auto" v-for="item in items" :key="item.id">
            <q-btn no-caps rounded color="primary" :label="`${item.name} (${item.count})`"
                   :to="`/${restrict}/${item.id}`"/>
          </div>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="currentPage" :max="5" direction-links boundary-links icon-first="skip_previous"
                        icon-last="skip_next" icon-prev="fast_rewind" icon-next="fast_forward"/>
        </div>

      </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
