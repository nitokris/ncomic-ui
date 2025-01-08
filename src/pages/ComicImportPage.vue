<script lang="ts" setup>

import {ref} from "vue";

const step = ref(1)

</script>

<component>


<q-stepper v-model="step" ref="steeper">

  <q-step :name="1" title="导入数据源" icon="settings" :done="step>1">
    233
  </q-step>

  <q-step title="数据校准" :name="2">

  </q-step>

  <template v-slot:navigation>
    <q-stepper-navigation>
      <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'"/>
      <q-btn v-if="step>1" flat color="primary" @click="$refs.stepper.pervious()" label="Back"/>
    </q-stepper-navigation>
  </template>

</q-stepper>

</component>
<style>

</style>
