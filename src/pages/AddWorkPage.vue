<script setup lang="ts">

import {computed, ref} from "vue";
import {api} from "boot/axios";
import NotificationMixins from "src/mixins/NotificationMixins";
import {useQuasar} from "quasar";
import {Author, Circle, Label} from "src/models";
import {apiLiveClient} from "src/api-client/live";


const prop = defineProps({
  workId: {type: String, required: false}
});


//@ts-ignore
const work = ref<Work>({
  id: 0,
  title: '',
  description: '',
  authors: [],
  tags: [],
  circle: null,
  release: '',
  cover: '',
  comicFileName: ''
});

const authors = ref<Array<Author>>([])

const tags = ref<Array<Label>>([])

const circles = ref<Array<Circle>>([])

const step = ref(1)

const apiUrl = computed(() => {
  return api.getUri()
})


function handleAfterUploadCover(info: any) {
  const response = info.xhr.response;
  if (response) {
    const parse = JSON.parse(response);
    work.value.cover = parse.data;
    console.log(work.value);
  }
}

function handleAfterUploadComicFile(info: any) {
  const response = info.xhr.response;
  if (response) {
    const parse = JSON.parse(response);
    work.value.comicFileName = parse.data;
    console.log(work.value);
  }
}

function handleUploadError(info: any) {
  NotificationMixins.showErrNotif(info.message)
}

function submitComicInfo() {
  const params = work.value
  api.post('work', params)
    .then((response) => {
      // 提示上传成功，然后清空表单
      NotificationMixins.showSuccNotif("上传成功")
    })
    .catch(error => {
      NotificationMixins.showErrNotif(error.message)
    })
}

function fetchWorkInfo() {
  if (!prop.workId) {
    return;
  }
  const $q = useQuasar();
  $q.loading.show()
  api.get(`/work/${prop.workId}`)
    .then(response => {
      work.value = response.data
    })
    .catch(error => {
      NotificationMixins.showErrNotif(error.message);
    })
    .finally(() => {
      $q.loading.hide()
    })
}

fetchWorkInfo()

function fetchTags() {
  api.get(`/tag/list`)
    .then(response => {
      tags.value = response.data
    })
    .catch(error => {
      NotificationMixins.showErrNotif(`加载tag失败:${error.message}`);
    })
}

fetchTags()

function fetchAuthors() {
  api.get(`/author/list`)
    .then(response => {
      authors.value = response.data
    })
    .catch(error => {
      NotificationMixins.showErrNotif(`加载作者失败:${error.message}`);
    })
}

fetchAuthors()

function fetchGroups() {
  api.get(`/group/list`)
    .then(response => {
      circles.value = response.data
    })
    .catch(error => {
      NotificationMixins.showErrNotif(`加载社团失败:${error.message}`);
    })
}

fetchGroups()

const options = [
  '手动',
  'DLSITE',
  'Fanza'
];

const sourceType = ref(options[0]);

const siteParam = ref({
  siteType: '',
  code: ''
});


async function handleClickNext() {
  step.value = step.value + 1;
  if (step.value > 2) {
    step.value = 2;
  }
  // 请求后台获取漫画数据
  const hentaiInfo = await apiLiveClient.works.fetchHentaiInfo(siteParam.value);
  console.log(hentaiInfo);
}


</script>

<template>

  <q-page class="q-layout-padding">
    <div class="row justify-center items-center">
      <div class="col-md-8">
        <q-stepper v-model="step" ref="steeper" animated color="primary">
          <q-step :name="1" title="导入数据源" icon="settings" :done="step>1">
            <q-card>
              <q-card-section title>
                <div class="text-h6">数据源</div>
              </q-card-section>
              <q-card-section>
                <div class="flex" style="justify-content: center;align-items: center;">
                  <q-select v-model="siteParam.siteType" filled :options="options" hint="数据源"></q-select>
                  <q-input v-model="siteParam.code" filled label="三方系统编码" hint="系统编号" lazy-rules
                           :rules="[ val => val && val.length > 0 || 'Please type something']"/>
                </div>
              </q-card-section>
            </q-card>
          </q-step>
          <q-step title="数据校准" :name="2">
            <q-card>
              <q-card-section title>
                <div class="text-h6">漫画信息调整</div>
              </q-card-section>
              <q-card-section>
                <div class="flex">
                  <div>
                    <q-uploader label="封面" auto-upload :url="`${apiUrl}/attachment`" method="POST"
                                style="max-height: 560px" field-name="file" enctype="multipart/form-data"
                                @uploaded="handleAfterUploadCover" :multiple="false" @fail="handleUploadError"/>
                  </div>
                  <div style="flex: 1;padding-left: 10px;">
                    <q-form class="q-gutter-md" :url="`${apiUrl}/work`">
                      <q-input v-model="work.title" filled :label="$t('workTitle')" hint="comic title" lazy-rules
                               :rules="[ val => val && val.length > 0 || 'Please type something']"/>
                      <q-input v-model="work.release" filled label="release *" hint="comic release date" lazy-rules
                               :rules="[ val => val && val.length > 0 || 'Please type something']"/>
                      <q-select filled v-model="work.tags" multiple :options="tags" use-chips stack-label label="Tags">
                        <template v-slot:option="{itemProps,opt,selected,toggleOption}">
                          <q-item v-bind="itemProps">
                            <q-item-section>
                              <q-item-label v-html="opt.name"/>
                            </q-item-section>
                            <q-item-section side>
                              <q-checkbox @update:model-value="toggleOption(opt||null)" :model-value="selected"/>
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="tag">
                          <q-chip removable dense color="white" @remove="work.tags.splice(tag.index, 1)"
                                  class="q-ma-none">{{ tag.opt.name }}
                          </q-chip>
                        </template>
                      </q-select>

                      <q-select filled v-model="work.authors" multiple :options="authors" use-chips stack-label
                                label="Authors">
                        <template v-slot:option="{itemProps,opt,selected,toggleOption}">
                          <q-item v-bind="itemProps">
                            <q-item-section>
                              <q-item-label v-html="opt.name"/>
                            </q-item-section>
                            <q-item-section side>
                              <q-checkbox @update:model-value="toggleOption(opt)" :model-value="selected"/>
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="tag">
                          <q-chip removable dense color="white" @remove="work.authors.splice(tag.index, 1)"
                                  class="q-ma-none">{{ tag.opt.name }}
                          </q-chip>
                        </template>
                      </q-select>

                      <q-select filled v-model="work.circle" :options="circles" use-chips stack-label
                                label="社团">
                        <template v-slot:option="{itemProps,opt,selected,toggleOption}">
                          <q-item v-bind="itemProps">
                            <q-item-section>
                              <q-item-label v-html="opt.name"/>
                            </q-item-section>
                            <q-item-section side>
                              <q-checkbox @update:model-value="toggleOption(opt)" :model-value="selected"/>
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:selected-item="tag">
                          <q-chip removable dense color="white" @remove="work.authors.splice(tag.index, 1)"
                                  class="q-ma-none">{{ tag.opt.name }}
                          </q-chip>
                        </template>
                      </q-select>
                      <q-item>
                        <q-btn label="Submit" type="button" color="primary" @click="submitComicInfo"/>
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
                      </q-item>
                    </q-form>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn @click="handleClickNext" color="primary" :label="step === 2 ? 'Finish' : 'Continue'"/>
              <q-btn v-if="step>1" flat color="primary" @click="step = step - 1" label="Back"/>
            </q-stepper-navigation>
          </template>

        </q-stepper>
      </div>

    </div>

  </q-page>

</template>

<style scoped>

</style>
