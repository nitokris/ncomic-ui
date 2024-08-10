<script setup lang="ts">
import {ref} from 'vue';
import {copyToClipboard} from "quasar";
import NotificationMixins from "src/mixins/NotificationMixins";
import {Sukebei} from "src/models";
import {apiClient} from "src/api-client";

defineOptions({
  name: 'SukebeiSearch',
});

const keyword = ref('');

function searchHandle() {
  selected.value = []
  initialPagination.value.page = 1;
  tableRef.value.requestServerInteraction()
}

const rows = ref<Array<Sukebei>>([]);

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

const initialPagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 75,
    rowsNumber: 150
  }
);

const loading = ref(false);

const tableRef = ref();


function onRequest(requestProp: any) {
  if (!(keyword.value.trim())) {
    return;
  }
  loading.value = true
  const {page, rowsPerPage, sortBy, descending} = requestProp.pagination
  apiClient.sukebi.search(keyword.value, page)
    .then(resp => {
      initialPagination.value.rowsNumber = resp.total;
      rows.value.splice(0, rows.value.length, ...resp.manga)
      for (let item of rows.value) {
        item.title = item.title.replace(keyword.value, `<span style="color: red !important;">${keyword.value}</span>`);
      }
      initialPagination.value.page = page
      initialPagination.value.sortBy = sortBy
      initialPagination.value.descending = descending
      initialPagination.value.rowsPerPage = 75
      NotificationMixins.showSuccNotif("搜索完成");
    }).catch(err => {
    NotificationMixins.showErrNotif(err.message);
  }).finally(() => {
    loading.value = false;
  })
}

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
          ref="tableRef"
          :columns="columns"
          row-key="magnet"
          selection="multiple"
          rows-key="magnet"
          v-model:selected="selected"
          v-model:pagination="initialPagination"
          @request="onRequest"
          :loading="loading"
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
              <q-td style="max-width: 300px;overflow: hidden" v-html="props.row.title">

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
