<template>
  <v-card class="mx-auto pb-2 secondary">
    <v-toolbar flat dense short class="secondary">
      <v-btn text color="primary">
        <span>{{ tolocalMonth }}</span>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @dblclick="$store.commit('setPull', ['salary'])"
        @click="$store.commit('pushPull', 'salary')"
      >
        <v-icon left>mdi-bank</v-icon>
        <span>{{ payroll.oklad }}</span>
      </v-btn>
      <v-fade-transition mode="out-in">
        <v-btn
          tile
          small
          icon
          color="primary"
          @click="state = 'currencies'"
          v-if="state != 'currencies'"
        >
          <v-icon>mdi-home-currency-usd</v-icon>
        </v-btn>
        <v-btn tile icon small color="primary" @click="state = 'minify'" v-else>
          <v-icon>mdi-arrow-collapse-all</v-icon>
        </v-btn>
      </v-fade-transition>
      <v-fade-transition mode="out-in">
        <v-btn
          tile
          icon
          small
          color="primary"
          @click="state = 'payments'"
          v-if="state != 'payments'"
        >
          <v-icon>mdi-credit-card-marker-outline</v-icon>
        </v-btn>
        <v-btn tile icon small color="primary" @click="state = 'minify'" v-else>
          <v-icon>mdi-arrow-collapse-all</v-icon>
        </v-btn>
      </v-fade-transition>
      <v-dialog
        v-if="$store.getters.getIsEdited"
        v-model="deleteDialog"
        persistent
        max-width="350"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn tile icon small color="accent" v-bind="attrs" v-on="on">
            <v-icon>mdi-delete-alert</v-icon>
          </v-btn>
        </template>
        <v-card class="secondary text-center">
          <v-card-title class="headline primary--text">
            Вы действительно хотите удалить карточку?
          </v-card-title>
          <v-card-text class="primary--text"
            >Удаление карточки приведет к безвозвратной потере данных о
            выплатах!</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false">
              Отменить
            </v-btn>
            <v-btn
              color="accent"
              text
              @click="(deleteDialog = false), deletePayroll(payroll.date)"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-container class="py-0">
      <v-row class="my-0 primary">
        <v-col cols="2" class="d-flex justify-end align-center py-1">
          <span class="caption px-1 secondary--text">BYN:</span>
        </v-col>
        <v-col cols="10" class="d-flex justify-center align-center py-1">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="secondary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['clear'])"
                @click="$store.commit('pushPull', 'clear')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-month</v-icon>
                {{ payroll.calculations.clear.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="secondary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['clearInDay'])"
                @click="$store.commit('pushPull', 'clearInDay')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-today</v-icon>
                {{ payroll.calculations.clearInDay.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="secondary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['clearInHour'])"
                @click="$store.commit('pushPull', 'clearInHour')"
              >
                <span></span>
                <v-icon small left>mdi-timer-sand</v-icon>
                {{ payroll.calculations.clearInHour.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="state == 'currencies'" class="my-0 secondary">
        <v-col cols="2" class="d-flex justify-end align-center py-1">
          <span class="caption px-1 primary--text" style="z-index: 1"
            >USD:</span
          >
        </v-col>
        <v-col cols="10" class="d-flex justify-center align-center py-1">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['USD'])"
                @click="$store.commit('pushPull', 'USD')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-month</v-icon>
                {{ payroll.calculations.USD.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['USDInDay'])"
                @click="$store.commit('pushPull', 'USDInDay')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-today</v-icon>
                {{ payroll.calculations.USDInDay.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['USDInHour'])"
                @click="$store.commit('pushPull', 'USDInHour')"
              >
                <span></span>
                <v-icon small left>mdi-timer-sand</v-icon>
                {{ payroll.calculations.USDInHour.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="state == 'currencies'" class="my-0 secondary">
        <v-col cols="2" class="d-flex justify-end align-center py-1">
          <span class="caption px-1 primary--text" style="z-index: 1"
            >EUR:</span
          >
        </v-col>
        <v-col cols="10" class="d-flex justify-center align-center py-1">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['EUR'])"
                @click="$store.commit('pushPull', 'EUR')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-month</v-icon>
                {{ payroll.calculations.EUR.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['EURInDay'])"
                @click="$store.commit('pushPull', 'EURInDay')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-today</v-icon>
                {{ payroll.calculations.EURInDay.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['EURInHour'])"
                @click="$store.commit('pushPull', 'EURInHour')"
              >
                <span></span>
                <v-icon small left>mdi-timer-sand</v-icon>
                {{ payroll.calculations.EURInHour.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="state == 'currencies'" class="my-0 secondary">
        <v-col cols="2" class="d-flex justify-end align-center py-1">
          <span class="caption px-1 primary--text" style="z-index: 1"
            >RUB:</span
          >
        </v-col>
        <v-col cols="10" class="d-flex justify-center align-center py-1">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['RUB'])"
                @click="$store.commit('pushPull', 'RUB')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-month</v-icon>
                {{ payroll.calculations.RUB.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['RUBInDay'])"
                @click="$store.commit('pushPull', 'RUBInDay')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-today</v-icon>
                {{ payroll.calculations.RUBInDay.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['RUBInHour'])"
                @click="$store.commit('pushPull', 'RUBInHour')"
              >
                <span></span>
                <v-icon small left>mdi-timer-sand</v-icon>
                {{ payroll.calculations.RUBInHour.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="state == 'currencies'" class="my-0 secondary">
        <v-col cols="2" class="d-flex justify-end align-center py-1">
          <span class="caption px-1 primary--text" style="z-index: 1"
            >UAH:</span
          >
        </v-col>
        <v-col cols="10" class="d-flex justify-center align-center py-1">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['UAH'])"
                @click="$store.commit('pushPull', 'UAH')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-month</v-icon>
                {{ payroll.calculations.UAH.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['UAHInDay'])"
                @click="$store.commit('pushPull', 'UAHInDay')"
              >
                <span></span>
                <v-icon small left>mdi-calendar-today</v-icon>
                {{ payroll.calculations.UAHInDay.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['UAHInHour'])"
                @click="$store.commit('pushPull', 'UAHInHour')"
              >
                <span></span>
                <v-icon small left>mdi-timer-sand</v-icon>
                {{ payroll.calculations.UAHInHour.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row
        v-if="state == 'payments'"
        class="secondary d-flex align-center my-0"
      >
        <v-col cols="2" class="d-flex justify-end align-center py-1">
          <span class="caption primary--text">Расчет:</span>
        </v-col>
        <v-col cols="10" class="d-flex justify-center align-center py-1">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['accrued'])"
                @click="$store.commit('pushPull', 'accrued')"
              >
                <span></span>
                <v-icon small left>mdi-bank-transfer-in</v-icon>
                {{ payroll.calculations.accrued.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['withheld'])"
                @click="$store.commit('pushPull', 'withheld')"
              >
                <span></span>
                <v-icon small left>mdi-bank-minus</v-icon>
                {{ payroll.calculations.withheld.value }}
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center px-1">
              <v-btn
                block
                color="primary"
                small
                outlined
                class="px-1"
                @dblclick="$store.commit('setPull', ['topayof'])"
                @click="$store.commit('pushPull', 'topayof')"
              >
                <span></span>
                <v-icon small left>mdi-bank-plus</v-icon>
                {{ payroll.calculations.topayof.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row
        class="px-1 my-0 primary secondary--text"
        v-show="state == 'payments'"
      >
        <v-col cols="1" class="pa-1 text-center outlined">
          <span class="subtitle-2 text-truncate">Код</span>
        </v-col>
        <v-col cols="7" class="pa-1 text-center">
          <span class="subtitle-2">Описание</span>
        </v-col>
        <v-col cols="2" class="pa-1 text-center">
          <span class="subtitle-2">Время</span>
        </v-col>
        <v-col cols="2" class="pa-1 text-center">
          <span class="subtitle-2 text-truncate">Знач</span>
        </v-col>
      </v-row>
    </v-container>

    <v-fade-transition>
      <v-list class="py-0 secondary" dense v-show="state == 'payments'">
        <v-list-item v-for="(pay, index) in payroll.payments" :key="index">
          <v-row>
            <v-col cols="1" class="px-1 text-center">
              <span class="subtitle-2 text-truncate primary--text">{{
                pay.code
              }}</span>
            </v-col>
            <v-col cols="7" class="px-1">
              <span class="subtitle-2 text-truncate primary--text">
                {{ getFromCode(pay.code, "description") }}
              </span>
            </v-col>
            <v-col cols="2" class="px-1">
              <v-btn
                block
                text
                :outlined="!!pay.time"
                class="px-0 primary--text"
                small
                @click="$store.commit('pushPull', [`${pay.code}Time`])"
                setlick="
            push $store.commit('pushPull', `${pay.code}Time`)
                "
                ><span class="subtitle-2 text-truncate">{{
                  pay.time
                }}</span></v-btn
              >
            </v-col>
            <v-col cols="2" class="px-1 text-center">
              <v-btn
                block
                class="px-0"
                :class="
                  getFromCode(pay.code, 'condition') == 'income'
                    ? 'light-green lighten-4 primary--text'
                    : 'red lighten-4 primary--text'
                "
                :outlined="!!pay.value"
                elevation="0"
                small
                @click="$store.commit('pushPull', [`${pay.code}Value`])"
                setlick="
            push $store.commit('pushPull', `${pay.code}Value`)
                "
              >
                <span class="subtitle-2 text-truncate">{{ pay.value }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-fade-transition>
  </v-card>
</template>
<script>
export default {
  name: "Payroll",
  props: ["payroll", "minimize"],
  data() {
    return {
      pay: [],
      state: "minify",
      deleteDialog: false,
    };
  },
  methods: {
    getFromCode(code, prop) {
      const result = this.$store.getters.getMetzCodes.find(
        (c) => +c.code == +code
      );
      if (result) {
        if (prop) {
          if (Object.prototype.hasOwnProperty.call(result, prop)) {
            return result[prop];
          }
        }
        return result;
      }
      return;
    },
    deletePayroll(date) {
      const cards = this.$store.getters.getJobs.metz.cards;
      let key;
      for (const prop in cards) {
        if (cards[prop].date == date) key = prop;
      }
      this.$store.dispatch("deletePayroll", key);
    },
  },
  computed: {
    accrued() {
      return this.payroll.payments
        .filter(
          (p) => p.value && this.getFromCode(p.code, "condition") == "income"
        )
        .map((p) => +p.value)
        .reduce((a, b) => a + b)
        .toFixed(2);
    },
    withheld() {
      return this.payroll.payments
        .filter(
          (p) => p.value && this.getFromCode(p.code, "condition") != "income"
        )
        .map((p) => +p.value)
        .reduce((a, b) => a + b)
        .toFixed(2);
    },
    topayoff() {
      return (this.accrued - this.withheld).toFixed(2);
    },
    clear() {
      const withheldClear = this.payroll.payments
        .filter(
          (p) =>
            p.value &&
            this.getFromCode(p.code, "condition") != "income" &&
            !this.$store.getters.getPrepaid.some((pp) => pp == p.code)
        )
        .map((p) => +p.value)
        .reduce((a, b) => a + b)
        .toFixed(2);
      return (this.accrued - withheldClear).toFixed(2);
    },
  },

  watch: {
    pay() {
      this.$store.commit("setPay", this.pay);
    },
  },
};
</script>
<style scoped>
.byn {
  position: relative;
}
.byn::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  height: 40%;
  background: #f44336;
}
.v-toolbar__content {
  padding: 4px 0px !important;
}
</style>