<template>
  <div>
    <h5>{{accountId}}</h5>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="resources" label="Resources" :to="{ query: { tab: '1' } }" />
      <q-route-tab name="usage" label="Usage" :to="{ query: { tab: '2' } }" />
      <q-route-tab name="arlogs" label="Logs" :to="{ query: { tab: '3' } }" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab">
      <q-tab-panel name="resources">
        <Resources :accountId="accountId" />
      </q-tab-panel>

      <q-tab-panel name="usage">
        <Usage :accountId="accountId" />
      </q-tab-panel>

      <q-tab-panel name="arlogs">
        <Logs :accountId="accountId" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

import Resources from './Resources.vue';
import Logs from './Logs.vue';
import Usage from './Usage.vue';

export default {
  name: 'AccountInfo',
  components: {
    Resources,
    Logs,
    Usage,
  },
  props: {
    accountId: {
      type: String,
    },
  },
  data() {
    return {
      tab: 'resources',
    };
  },
};
</script>
