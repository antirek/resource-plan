<template>
  <div id="q-app">

      <q-layout view="hHh lpR fFf">

        <q-header elevated class="bg-primary text-white" height-hint="98">
          <q-toolbar>

            <q-toolbar-title>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
              </q-avatar>
              Resources
            </q-toolbar-title>
          </q-toolbar>

          <q-tabs align="left">
            <q-route-tab to="/accounts" label="Accounts" />
            <q-route-tab to="/apps" label="Apps" />
            <q-route-tab to="/resources" label="Resources" />
          </q-tabs>
        </q-header>

        <q-page-container>
          <router-view />
        </q-page-container>

      </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      left: false,
    };
  },

};
</script>
