<script setup lang="ts">

import {ref} from "vue";
// import WorkListItem from "components/WorkListItem.vue";
import WorkCard from "components/WorkCard.vue";
import {api} from "boot/axios";
import NotificationMixins from "src/mixins/NotificationMixins";


defineProps({
  mode: String,
  restrict: String
});

// data
const keyword = ref('');
const listView = ref(false);
const stopLoad = ref(false);
const works = ref([]);
const pageTitle = ref('所有漫画');

const pagination = ref({});

const sortOption = ref({
  label: '按照发售日期新到老的顺序',
  order: 'release',
  sort: 'desc'
});


/**
 * 请求后台API
 */

function requestWorksQueue() {
  const params = {
    order: sortOption.value.order,
    sort: sortOption.value.sort,
    page: pagination.value.currentPage + 1 || 1
  }
  return api.get('/work/list', {params})
    .then((response) => {
      const fromNetWorks = response.data.works;
      works.value = (params.page === 1) ? fromNetWorks.concat() : works.value.concat(fromNetWorks)
      pagination.value = response.data.pagination
      if (works.value.length >= pagination.value.totalCount) {
        stopLoad.value = true;
      }
    }).catch(error => {
      if (error.reponse) {
        // 请求已发出，但服务端向不是200
        if (error.reponse.status !== 401) {
          // 提示错误信息
          NotificationMixins.showErrNotif(error.message)
        } else {

        }
      }
      stopLoad.value = true;
    })
}

requestWorksQueue();

const currentPage = ref(1);

</script>

<template>
  <q-page>
    <!--左上角的标题显示-->
    <div class="text-h6 text-weight-regular q-px-sm q-py-md">
      {{ pageTitle }}
      <span v-show="pagination.totalCount">
        ({{ pagination.totalCount }})
      </span>
      <q-btn flat round dense icon="close" v-show="restrict"/>
    </div>
    <div class="col q-px-md row q-col-gutter-x-md q-col-gutter-y-lg">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2" v-for="work in works" :key="work.id">

        <WorkCard :workid="work.id" class="fit"/>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="currentPage" :max="5" direction-links boundary-links icon-first="skip_previous"
                    icon-last="skip_next" icon-prev="fast_rewind" icon-next="fast_forward"/>
    </div>
  </q-page>
</template>

<style scoped>

</style>
