<script setup lang="ts">
import {ref} from 'vue';
import {api} from "boot/axios";
import {copyToClipboard} from "quasar";
import NotificationMixins from "src/mixins/NotificationMixins";
import {json} from "express";

defineOptions({
  name: 'SukebeiSearch',
});

const keyword = ref('');

function searchHandle() {
  api.get(`sukebei/${keyword.value}`)
    .then(resp => {
      rows.value = [].concat(resp.data);
      selected.value = [];
      NotificationMixins.showSuccNotif("搜索完成");
    }).catch(err => {
    NotificationMixins.showErrNotif(err.message);
  }).finally(() => {
    loading.value = false;
  })
}

const rows = ref([]);

const columns = [
  {
    name: 'type',
    required: true,
    label: '类型',
    align: 'left',
    field: (row: any) => row.type,
    require: false
  },
  {
    name: 'title',
    required: true,
    label: '标题',
    align: 'left',
    field: (row: any) => row.title,
    require: false
  }, {
    name: 'fileSize',
    required: true,
    label: '文件大小',
    align: 'left',
    field: (row: any) => row.fileSize,
    require: false
  }, {
    name: 'date',
    required: true,
    label: '发行时间',
    align: 'left',
    field: (row: any) => row.date,
    require: false
  }
];

const selected = ref<Array<any>>([]);

function handleCopy() {
  const array = [];
  for (let item of selected.value) {
    array.push(item.magnet);
  }
  copyToClipboard(`${array.join('\n')}`).then(() => {
    NotificationMixins.showSuccNotif("拷贝成功");
  }).catch(e => {
    NotificationMixins.showErrNotif(`拷贝失败：${e}`);
  })
}

const initialPagination = {
  descending: false,
  page: 1,
  rowsPerPage: 50
}


const loading = ref(true);
</script>

<template>
  <q-page class="q-layout-padding">
    <q-card style="width: 100%">
      <q-card-section title>
        <q-input v-model="keyword" label="关键词" @keyup.enter="searchHandle">
          <template v-slot:append>
            <q-btn>
              <q-icon @click="searchHandle" name="search"/>
            </q-btn>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>

        <q-table
          flat bordered
          title="搜索结果"
          :rows="rows"
          :columns="columns"
          row-key="magnet"
          selection="multiple"
          v-model:selected="selected"
          :pagination="initialPagination"
        >
          <template v-slot:top>
            <q-btn @click="handleCopy" color="primary" :disable="loading && !selected.length" label="拷贝"/>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-checkbox v-model="props.selected"/>
              </q-td>
              <q-td style="width: 150px;">
                <q-img :src="props.row.type"/>
              </q-td>
              <q-td style="max-width: 300px;overflow: hidden">
                <span :title="props.row.title">{{ props.row.title }}</span>
              </q-td>
              <q-td>
                <span>{{ props.row.fileSize }}</span>
              </q-td>
              <q-td>
                <span>{{ props.row.date }}</span>
              </q-td>
            </q-tr>
          </template>

        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

</style>
