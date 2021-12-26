<template>
  <v-app>
    <!-- <Navbar v-if="$store.getters.getUser.isAuth" /> -->
    <v-row v-if="$store.getters.loaded != 'completed'" class="fill-height" align-content="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon x-large :color="$store.getters.getFromLoadingStatus.color">{{ $store.getters.getFromLoadingStatus.mdi }}</v-icon>
      </v-col>
      <v-col class="title text-center" cols="12">
        {{ $store.getters.getFromLoadingStatus.status }}
      </v-col>
      <v-col cols="6">
        <v-progress-linear :color="$store.getters.getFromLoadingStatus.color" indeterminate rounded height="6"></v-progress-linear>
      </v-col>
    </v-row>
    <v-main class="secondary">
      <router-view></router-view>
    </v-main>
    <!-- <v-snackbar multi-line app shaped transition="fab-transition" outlined elevation="20" class="primary" :class="'text-' + $store.getters.getAlert.type" v-model="$store.getters.getAlert.show" timeout="2000">
      <template>
        <v-icon class="mb-1" :color="$store.getters.getAlert.type">mdi {{ $store.getters.getAlert.mdi }}</v-icon>
        <span class="title">{{ " " + $store.getters.getAlert.message }}</span>
      </template>
    </v-snackbar> -->
  </v-app>
</template>
<script>
export default {
  async mounted() {
    console.log("loading", this.$store.getters.loaded);
    await this.$store.dispatch("getUserInfo");
    if (!this.$store.getters.getUser.isAuth && location.pathname.indexOf("login") == -1) {
      this.$router.push("/login");
    }
    this.$vuetify.theme.themes.light.primary = this.$store.getters.getSettings.colors.light.primary;
    this.$vuetify.theme.themes.light.secondary = this.$store.getters.getSettings.colors.light.secondary;
    this.$vuetify.theme.themes.light.accent = this.$store.getters.getSettings.colors.light.accent;
  },
  components: {},
  created() {},
};
</script>
<style lang="scss">
html {
  overflow: hidden;
}
</style>
