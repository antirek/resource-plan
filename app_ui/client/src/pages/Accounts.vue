<template>
  <div class="row">
     <div class="col-2 q-pa-md">
        <q-list bordered separator>
          <q-item
            clickable v-ripple
            v-for="(account, index) in accounts" v-bind:key="index"
            :to="`/accounts/${account.accountId}/info`"
            @click="$router.go()"
          >
            <q-item-section>{{ account.accountId }} {{ account.title }}</q-item-section>
          </q-item>
        </q-list>
     </div>

     <div class="col-10 q-pa-md">
      <router-view />
     </div>
  </div>
</template>

<script>

import { Account } from '../api';

export default {
  name: 'PageAccounts',
  data() {
    return {
      accounts: [],
    };
  },
  async created() {
    this.accounts = (await Account.query()).data;
  },
};
</script>
