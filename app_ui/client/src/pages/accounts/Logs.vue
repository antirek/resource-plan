<template>
  <q-table
      title="Logs"
      :data="logs"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
  />
</template>

<script>
import { Account } from '../../api';

export default {
  name: 'ARLogs',
  props: {
    accountId: {
      type: String,
    },
  },
  data() {
    return {
      logs: [],
      columns: [
        { name: 'date', label: 'date', field: 'date' },
        { name: 'accountId', label: 'accountId', field: 'accountId' },
        { name: 'resourceId', label: 'resourceId', field: 'resourceId' },
        { name: 'operation', label: 'operation', field: 'operation' },
        { name: 'oldValue', label: 'oldValue', field: 'oldValue' },
        { name: 'diffValue', label: 'diffValue', field: 'diffValue' },
        { name: 'newValue', label: 'newValue', field: 'newValue' },
        { name: 'appId', label: 'appId', field: 'appId' },
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
    this.logs = (await Account.logs(this.accountId)).data;
    this.pagination.rowsNumber = this.logs.count;
  },
};
</script>
