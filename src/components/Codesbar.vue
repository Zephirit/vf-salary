<template>
  <v-sheet>
    <v-btn
      class="ma-0"
      @click="drawer = !drawer"
      elevation="3"
      top
      right
      fixed
      fab
      color="primary"
    >
      <v-icon dark> mdi-code-string </v-icon>
    </v-btn>
    <v-navigation-drawer
      app
      v-model="drawer"
      right
      color="secondary"
      fixed
      temporary
      width="374px"
    >
      <v-list nav dense>
        <v-subheader>Коды зачислений</v-subheader>
        <v-list-item
          class="p-0 m-0"
          v-for="(code, index) in codes"
          :key="index"
          :class="code.condition == 'income' ? 'success' : 'error'"
        >
          <v-row>
            <v-col cols="2" class="py-0 d-flex align-center justify-center">
              <span class="caption">{{ code.code }}</span>
            </v-col>
            <v-col cols="10" class="px-0 py-0 d-flex align-center">
              <span class="caption">{{ code.description }}</span>
            </v-col>
          </v-row></v-list-item
        >
      </v-list>
    </v-navigation-drawer></v-sheet
  >
</template>
<script>
export default {
  name: "Codesbar",
  
  data() {
    return {
      drawer: false,
      codes: [],
    };
  },
  async mounted() {
    this.codes = this.$store.getters.getMetzCodes
  },
};
</script>