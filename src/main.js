import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify/lib";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import mixins from "./mixins";
import "./directives";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "./registerServiceWorker";
import VChart from "vue-echarts";
import { use } from "echarts/core";

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart, LinesChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, DataZoomComponent, DataZoomInsideComponent, ToolboxComponent, DataZoomSliderComponent, MarkLineComponent } from "echarts/components";
use([CanvasRenderer, LineChart, BarChart, LinesChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, DataZoomComponent, DataZoomInsideComponent, ToolboxComponent, DataZoomSliderComponent, MarkLineComponent]);
Vue.component("v-chart", VChart);
Vue.use(Vuetify);

new Vuetify({});
Vue.mixin(mixins);
Vue.config.productionTip = false;
firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API,
  authDomain: "vf-salary.firebaseapp.com",
  projectId: "vf-salary",
  storageBucket: "vf-salary.appspot.com",
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
});
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      store,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
