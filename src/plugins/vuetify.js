import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
import ru from 'vuetify/es5/locale/ru'
Vue.use(Vuetify);


export default new Vuetify({
  lang: {
    locales: {
      ru
    },
    current: 'ru',
  },
  theme: {
    themes: {
      light: {
        primary: colors.blueGrey.darken4,
        secondary: colors.brown.lighten5,
        accent: colors.red.accent1,
        background: colors.brown.lighten5,
        error: colors.pink.accent3,
        info: colors.indigo.accent3,
        success: colors.teal.accent3,
        warning: colors.amber.accent3,
      },
    },
  },
});
