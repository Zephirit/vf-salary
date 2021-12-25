<template>
  <v-sheet>
    <v-btn
      class="ma-0"
      @click="drawer = !drawer"
      elevation="5"
      icon
      fixed
      small
      tile
      fab
      color="primary"
    >
      <v-icon dark> mdi-menu-open </v-icon>
    </v-btn>
    <v-navigation-drawer app v-model="drawer" color="secondary" fixed temporary>
      <v-list>
        <v-list-item class="px-2 mx-5">
          <v-list-item-avatar size="60" color="primary">
            <v-icon color="secondary" x-large
              >mdi
              {{
                $store.getters.getUser.isAdmin ? "mdi-cryengine" : "mdi-account"
              }}</v-icon
            >
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ $store.getters.getUser.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $store.getters.getUser.isAdmin ? "Администратор" : "Пользователь"
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn fab outlined color="accent" @click="$store.dispatch('logout')">
            <v-icon> mdi-logout </v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-subheader>Работы</v-subheader>
        <v-list-item class="p-0 m-0" v-for="job in $store.getters.getJobs" :key="job.id">
          <v-list-item-title>{{ job.company }}</v-list-item-title></v-list-item
        >
      </v-list>
    </v-navigation-drawer></v-sheet
  >
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style>
</style>