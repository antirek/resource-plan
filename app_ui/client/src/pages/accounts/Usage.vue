<template>
  <div>
    <q-input filled v-model="date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              v-model="date"
              @input="() => {$refs.qDateProxy.hide(); update()}"
              minimal
              first-day-of-week="1"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-table
        title="Usage"
        :data="resources"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
    />
  </div>
</template>

<script>

import moment from 'moment';
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
      date: moment().format('YYYY/MM/DD'),
      resources: [],
      columns: [
        { name: 'resourceId', label: 'resourceId', field: 'resourceId' },
        { name: 'count', label: 'count', field: 'count' },
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
  methods: {
    async update() {
      this.resources = (await Account.usage(this.accountId, moment(new Date(this.date)).format('YYYY-MM-DD'))).data;
      this.pagination.rowsNumber = this.resources.count;
    },
  },
  async mounted() {
    this.update();
  },
};
</script>
