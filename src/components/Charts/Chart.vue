<template>
  <v-chart
    autoresize
    class="chart grow"
    theme="dark"
    ref="chart"
    :init-options="init"
    :option="option"
    style="height: 100%"
  />
</template>

<script>
import localeRu from "./localeRu.js";
export default {
  name: "Chart",
  data() {
    return {
      init: {
        localeCfg: localeRu,
      },

      option: {
        legend: {
          data: [],
          selected: {},
          right: 120,
        },
        toolbox: {
          right: 10,
          itemSize: 20,
          showTitle: false,
          feature: {
            magicType: {
              type: ["line", "bar"],
            },
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
        },
        yAxis: { type: "value" },
        dataset: {
          source: [],
        },
        dataZoom: [
          {
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter",
            rangeMode: ["value", "percent"],
            start: 70,
            end: 100,
          },
          {
            type: 'inside',
            realtime: true,
            xAxisIndex: [0, 1]
        }
        ],
        series: [],
      },
    };
  },
  methods: {
    fillData() {
      this.$refs.chart.clear();
      this.option.series = this.$store.getters.getPull.map((p) => {
        return {
          name: this.$store.getters.getCalculatedPayrolls.find(
            (cp) => cp.calculations[p]
          ).calculations[p].name,
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          markLine: {
            silent: true,
            precision: 1,
            data: [
              {
                type: "average",
              },
            ],
          },
          data: this.getDataFromList(p),
        };
      });
      this.option.legend.data = this.$store.getters.getPull.map(
        (p) =>
          this.$store.getters.getCalculatedPayrolls.find(
            (cp) => cp.calculations[p]
          ).calculations[p].name
      );
      this.$store.getters.getPull.map((p) => {
        const name = this.$store.getters.getCalculatedPayrolls.find(
          (cp) => cp.calculations[p]
        ).calculations[p].name;
        // if (i == 0) {
        this.option.legend.selected[name] = true;
        // } else {
        //   this.option.legend.selected[name] = false;
        // }
      });
      console.log(this.option);
    },
    getDataFromList(p) {
      return this.$store.getters.getCalculatedPayrolls
        .map((cp) => {
          return [this.getRuMonth(cp.date), cp.calculations[p].value];
        })
        .reverse();
    },
    update() {
      this.fillData();
    },
  },
  mounted() {
    this.fillData();
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getPull,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`);
        this.fillData();
      }
    );
  },
};
</script>

<style>
</style>