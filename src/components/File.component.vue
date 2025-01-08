<script setup lang="ts">

import {ref} from "vue";

defineOptions({
  name: "FileSelect",
})

interface File {
  fileId: string
  originalName: string
}

const selectedFiles = ref<File>()

const options = ref<Array<File>>();

function abortFilterFn() {
  console.log('delayed filter aborted')
}

async function filterFn(val: any, update: any, abort: any) {
  const resp = await (await fetch('http://localhost:2333/file/recent/1/30')).json()
  console.log(resp)
  update(() => {
    options.value = resp.data
  })
}
</script>

<template>


  <q-select
    filled
    v-model="selectedFiles"
    :options="options"
    :option-value="opt => Object(opt) === opt && 'fileId' in opt ? opt.fileId : null"
    :option-label="opt => Object(opt) === opt && 'originalName' in opt ? opt.originalName : '- Null -'"
    emit-value
    map-options
    @update:model-value="console.log(selectedFiles)"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
  />

</template>

<style scoped>

</style>
