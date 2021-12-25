import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import mixins from './mixins'
import './directives'
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import './registerServiceWorker'
import VChart from "vue-echarts";
import {
  use
} from 'echarts/core'


// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  LineChart,
  BarChart,
  LinesChart,
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  ToolboxComponent,
  DataZoomSliderComponent,
  MarkLineComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  LinesChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  ToolboxComponent,
  DataZoomSliderComponent,
  MarkLineComponent,
]);
Vue.component('v-chart', VChart)
Vue.use(Vuetify)

new Vuetify({})
Vue.mixin(mixins)
Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: "AIzaSyDRyqzAgmQcV9sJLQSBv6uhAxkVG2T34ns",
  authDomain: "vf-salary.firebaseapp.com",
  projectId: "vf-salary",
  storageBucket: "vf-salary.appspot.com",
  messagingSenderId: "87602971040",
  appId: "1:87602971040:web:930eca2b249e926f22a4c5",
  measurementId: "G-P9EZH9HWGP"
})
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }

})