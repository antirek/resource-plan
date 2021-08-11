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
      <q-tab name="resources" label="Resources" />
      <q-route-tab name="arlogs" label="Logs" :to="{ query: { tab: '1' } }" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="resources">
        <q-table
          title="Resources"
          :data="resources"
          :columns="resourceColumns"
          row-key="name"
          :pagination.sync="pagination"
        />
      </q-tab-panel>

      <q-tab-panel name="arlogs">
        <div class="text-h6">Logs</div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

import { Account } from '../api';

export default {
  name: 'AccountInfo',
  props: {
    accountId: {
      type: String,
    },
  },
  data() {
    return {
      tab: 'resources',
      resources: null,
      resourceColumns: [
        { name: 'accountId', label: 'accountId', field: 'accountId' },
        { name: 'resourceId', label: 'resourceId', field: 'resourceId' },
        { name: 'value', label: 'value', field: 'value' },
        { name: 'lastChanged', label: 'lastChanged', field: 'lastChanged' },
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 100,
        rowsNumber: 10,
      },
    };
  },
  async mounted() {
    this.resources = (await Account.resources(this.accountId)).data;
    this.pagination.rowsNumber = this.resources.count;
  },
};
</script>
