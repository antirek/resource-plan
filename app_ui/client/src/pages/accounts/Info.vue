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
      <q-route-tab name="arlogs" label="Logs" :to="{ query: { tab: '2' } }" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="resources">
        <Resources :accountId="accountId" />
      </q-tab-panel>

      <q-tab-panel name="arlogs">
        <div class="text-h6">Logs</div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

import Resources from './Resources.vue';

export default {
  name: 'AccountInfo',
  components: {
    Resources,
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
