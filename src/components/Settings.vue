<template>
  <v-navigation-drawer
    v-model="settings"
    @input="setSettings"
    fixed
    stateless
    temporary
    elevation="1"
    width="100%"
    overlay-opacity
    class="background"
    style="height: 100%"
    ><v-form style="height: 100%">
      <v-container style="height: 100%" class="pa-4 my-3">
        <v-menu
          ref="menu"
          v-model="menus.light.primary"
          :close-on-content-click="false"
          :return-value="formSettings.colors.light.primary"
          transition="scale-transition"
          offset-y
          max-width="400px"
          width="100%"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="formSettings.colors.light.primary"
                  class="my-1"
                  label="Выберите основной цвет"
                  readonly
                  hide-details
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-3">
                <v-card
                  height="100%"
                  width="100%"
                  :style="`background:${formSettings.colors.light.primary}`"
                  v-bind="attrs"
                  v-on="on"
                ></v-card>
              </v-col>
            </v-row>
          </template>
          <v-color-picker
            dot-size="25"
            mode="hexa"
            hide-mode-switch
            v-model="formSettings.colors.light.primary"
          >
          </v-color-picker>
        </v-menu>

        <v-menu
          ref="menu"
          v-model="menus.light.secondary"
          :close-on-content-click="false"
          :return-value="formSettings.colors.light.secondary"
          transition="scale-transition"
          offset-y
          class="py-1"
          max-width="400px"
          width="100%"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="formSettings.colors.light.secondary"
                  label="Выберите вспомогательный цвет"
                  readonly
                  hide-details
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-3">
                <v-card
                  height="100%"
                  width="100%"
                  :style="`background:${formSettings.colors.light.secondary}`"
                  v-bind="attrs"
                  v-on="on"
                ></v-card>
              </v-col>
            </v-row>
          </template>
          <v-color-picker
            dot-size="25"
            mode="hexa"
            hide-mode-switch
            v-model="formSettings.colors.light.secondary"
          >
          </v-color-picker>
        </v-menu>

        <v-menu
          ref="menu"
          v-model="menus.light.accent"
          :close-on-content-click="false"
          :return-value="formSettings.colors.light.accent"
          transition="scale-transition"
          offset-y
          class="py-1"
          max-width="400px"
          width="100%"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="formSettings.colors.light.accent"
                  label="Выберите акцентирующий цвет"
                  readonly
                  hide-details
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-3">
                <v-card
                  height="100%"
                  width="100%"
                  :style="`background:${formSettings.colors.light.accent}`"
                  v-bind="attrs"
                  v-on="on"
                ></v-card>
              </v-col>
            </v-row>
          </template>
          <v-color-picker
            dot-size="25"
            mode="hexa"
            hide-mode-switch
            v-model="formSettings.colors.light.accent"
          >
          </v-color-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menus.light.background"
          :close-on-content-click="false"
          :return-value="formSettings.colors.light.background"
          transition="scale-transition"
          offset-y
          class="my-1"
          max-width="400px"
          width="100%"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="formSettings.colors.light.background"
                  label="Выберите цвет фона"
                  readonly
                  hide-details
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-3">
                <v-card
                  height="100%"
                  width="100%"
                  :style="`background:${formSettings.colors.light.background}`"
                  v-bind="attrs"
                  v-on="on"
                ></v-card>
              </v-col>
            </v-row>
          </template>
          <v-color-picker
            dot-size="25"
            mode="hexa"
            hide-mode-switch
            v-model="formSettings.colors.light.background"
          >
          </v-color-picker>
        </v-menu>
      </v-container>
      <v-bottom-navigation class="secondary" fixed>
        <v-btn @click="saveSettings()">
          <v-icon color="primary">mdi-content-save-cog</v-icon>
        </v-btn>
        <v-fab-transition>
          <v-btn
            @click="$store.commit('setIsEdited', false)"
            v-if="$store.getters.getIsEdited"
          >
            <v-icon color="accent">mdi-cancel</v-icon>
          </v-btn>
          <v-btn @click="$store.commit('setIsEdited', true)" v-else>
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')">
          <v-icon color="accent">mdi-close</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-form>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "Settings",
  props: ["settings"],
  data() {
    return {
      menus: {
        light: {
          primary: false,
        },
      },
      formSettings: {
        colors: {
          light: {
            primary: this.$store.getters.getSettings.colors.light.primary,
            secondary: this.$store.getters.getSettings.colors.light.secondary,
            accent: this.$store.getters.getSettings.colors.light.accent,
            background: this.$store.getters.getSettings.colors.light.background,
          },
        },
      },
    };
  },
  methods: {
    saveSettings() {
      this.$store.dispatch("saveSettigns", this.formSettings);
      this.$vuetify.theme.themes.light.primary = this.formSettings.colors.light.primary;
      this.$vuetify.theme.themes.light.secondary = this.formSettings.colors.light.secondary;
      this.$vuetify.theme.themes.light.accent = this.formSettings.colors.light.accent;
      this.$vuetify.theme.themes.light.background = this.formSettings.colors.light.background;
    },
    setSettings() {
      this.formSettings.colors.light.primary = this.$store.getters.getSettings.colors.light.primary;
      this.formSettings.colors.light.secondary = this.$store.getters.getSettings.colors.light.secondary;
      this.formSettings.colors.light.accent = this.$store.getters.getSettings.colors.light.accent;
      this.formSettings.colors.light.background = this.$store.getters.getSettings.colors.light.background;
    },
  },
};
</script>
