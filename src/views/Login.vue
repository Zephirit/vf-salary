<template>
  <v-card max-width="320px" class="mx-auto my-15">
    <v-form
      @submit.prevent="$store.dispatch('submit', { email, password })"
      class="card p-3 pa-2 px-3"
    >
      <v-text-field
        label="Введите почту"
        type="email"
        v-model="email"
        hide-details="auto"
        class="ma-2 "
      ></v-text-field>
      <v-text-field
        label="Введите пароль"
        type="password"
        v-model="password"
        hide-details="auto"
        class="ma-2"
      ></v-text-field>
      <div class="d-flex justify-space-around " style="background: gray">
        <v-btn class="ma-1" color="primary" type="submit"> Войти </v-btn>
        <v-btn class="ma-1" color="primary" plain to="/register"> Регистрация </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {},
  async mounted(){
    const auth = await this.$store.dispatch("getUid")
    if (auth != null) {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>