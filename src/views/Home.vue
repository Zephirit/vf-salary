<template>
  <v-sheet
    v-if="$store.getters.loaded == 'completed'"
    color="background"
    class="pb-16"
  >
    <v-row class="mx-auto">
      <v-col
        cols="12"
        md="6"
        lg="4"
        style="height: calc(100vh - 44px); overflow: auto"
      >
        <v-row class="mt-1">
          <v-col
            cols="12"
            class="py-1 px-1"
            v-for="(payroll, index) in $store.getters.getCalculatedPayrolls"
            :key="index"
          >
            <Payroll :minimize="minimize" :payroll="payroll"></Payroll>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!isMobile" md="6" lg="8" class="pb-1 pt-4 px-1">
        <v-sheet
          min-height="100%"
          rounded
          color="primary"
          elevation="1"
          style="overflow: hidden"
          class="d-flex flex-column"
        >
          <v-container style="flex-grow: 1" class="d-flex flex-column pa-0">
            <Chart :isMobile="isMobile" />
            <!-- <v-btn v-if="!isMobile" @click="update()"> Обновить </v-btn> -->
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog fullscreen v-model="addSalary">
      <AddSalary v-if="addSalary" @close="addSalary = false" />
    </v-dialog>
    <v-navigation-drawer
      v-model="mobileChart"
      fixed
      stateless
      temporary
      elevation="1"
      width="100%"
      overlay-opacity
      right
      style="height: 100%"
    >
      <v-container
        style="height: calc(100% - 56px)"
        class="d-flex flex-column pa-0"
      >
        <Chart v-if="isMobile" style="height: 100%" />
        <v-btn v-if="!isMobile" @click="update()"> Обновить </v-btn>
      </v-container>
      <v-bottom-navigation class="secondary" fixed>
        <v-btn @click="addSalary = !addSalary">
          <v-icon color="primary">mdi-wallet-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="mobileChart = false">
          <v-icon color="accent">mdi-close</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-navigation-drawer>
    <Settings :settings="settings" @close="settings = false" />
    <v-bottom-navigation class="secondary" fixed>
      <v-btn @click="addSalary = !addSalary">
        <v-icon color="primary">mdi-wallet-plus</v-icon>
      </v-btn>
      <v-btn v-if="isMobile" @click="mobileChart = true">
        <v-icon color="primary">mdi-google-analytics</v-icon>
      </v-btn>
      <v-btn @click="settings = true">
        <v-icon color="primary">mdi-cog</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$store.dispatch('logout')">
        <v-icon color="accent">mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-sheet>
</template>

<script>
import AddSalary from "../components/AddSalary";
import Settings from "../components/Settings";
import Payroll from "../components/Payroll";
import Chart from "../components/Charts/Chart";
export default {
  name: "Home",
  data() {
    return {
      addSalary: false,
      mobileChart: false,
      settings: false,
      isMobile: false,
      minimize: true,
      analytics: false,
      pull: ["clear", "accrued"],
      option: {
        xAxis: {
          type: "category",
        },
        yAxis: { gridIndex: 0 },
        dataset: {
          source: [],
        },
        series: [
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
        ],
      },
    };
  },
  methods: {},
  mounted() {
    const getIsMobile = () => {
      if (window.innerWidth < 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    };
    getIsMobile();
    window.addEventListener("resize", () => {
      getIsMobile();
    });
  },
  components: {
    AddSalary,
    Settings,
    Payroll,
    Chart,
  },
};
</script>
<style scoped>
</style>
