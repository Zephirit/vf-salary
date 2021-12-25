<template>
  <v-card max-width="320px" class="mx-auto my-15">
    <v-form
      @submit.prevent="$store.dispatch('register', { email, password, name })"
      class="card p-3 pa-2 px-3"
    >
      <v-text-field
        label="Введите Имя"
        type="text"
        v-model="name"
        required
        hide-details="auto"
        class="ma-2"
      ></v-text-field>
      <v-text-field
        label="Введите почту"
        type="email"
        required
        v-model="email"
        hide-details="auto"
        class="ma-2"
      ></v-text-field>
      <v-text-field
        label="Введите пароль"
        type="text"
        required
        v-model="password"
        hide-details="auto"
        class="ma-2"
      ></v-text-field>
      <v-checkbox v-model="rule" label="Вы точно хотите этого?"></v-checkbox>
      <div class="d-flex justify-space-around">
        <v-btn :disabled="!rule" class="ma-1" color="primary" type="submit">
          Создать
        </v-btn>
        <v-btn class="ma-1" color="grey" plain to="/login"> Войти </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      rule: false,
    };
  },
  methods: {},
  async mounted() {
    const auth = await this.$store.dispatch("getUid")
    if (auth != null) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>