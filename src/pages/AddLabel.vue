<script setup lang="ts">


import {ref, watch} from "vue";
import {api} from "boot/axios";
import NotificationMixins from "src/mixins/NotificationMixins";

const prop = defineProps({
  restrict: {
    type: String,
    require: true
  }
});

const label = ref('');

function addLabel() {
  const formData = new FormData();
  formData.append("name", label.value.trim())
  api.post(`/${prop.restrict!}`, formData)
    .then((response) => {
      NotificationMixins.showSuccNotif("添加成功");
      console.log(response);
    }).catch((error) => {
    NotificationMixins.showErrNotif(error.message)
  })
}

watch(() => prop.restrict, () => {
  label.value = ''
})

</script>

<template>
  <q-page class="q-layout-padding">
    <div class="row justify-center items-center">
      <div class="col-md-6">
        <q-card>
          <q-card-section title>
            <div class="text-h6">添加 {{ restrict }}</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="label" filled :label="$t('workTitle')" hint="comic title" lazy-rules
                     :rules="[ val => val && val.length > 0 || 'Please type something']"/>
            <q-item>
              <q-btn label="Submit" type="submit" color="primary" @click="addLabel"/>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<style scoped>

</style>
