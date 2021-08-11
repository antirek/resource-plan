<template>
  <q-table
      title="Resources"
      :data="resources"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
  />
</template>

<script>
import { Account } from '../../api';

export default {
  name: 'AccountResources',
  props: {
    accountId: {
      type: String,
    },
  },
  data() {
    return {
      resources: [],
      columns: [
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
