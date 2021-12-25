<template>
  <v-card>
    <v-form @submit.prevent="addSalary">
      <v-toolbar dark flat dense color="primary" class="mb-2">
        <v-toolbar-title>Добавление расчетника</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="accent" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container class="pb-0">
        <v-row>
          <v-col cols="6" class="py-0">
            <v-select
              v-model="item"
              prepend-icon="mdi-briefcase"
              :items="Object.keys($store.getters.getJobs)"
              label="Работа"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field
              prepend-icon="mdi-bank"
              label="Оклад"
              type="number"
              v-model="form.oklad"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              :return-value.sync="form.date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.date"
                  label="Выберите месяц"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.date"
                @change="getUSD()"
                :allowed-dates="allowedMonths"
                type="month"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(form.date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3" class="py-0">
            <v-text-field label="Курс USD" v-model="form.USD"></v-text-field>
          </v-col>
          <v-col cols="3" class="py-0">
            <v-text-field label="Курс EURO" v-model="form.EUR"></v-text-field>
          </v-col>
          <v-col cols="3" class="py-0">
            <v-text-field label="Курс RUB" v-model="form.RUB"></v-text-field>
          </v-col>
          <v-col cols="3" class="py-0">
            <v-text-field label="Курс UAH" v-model="form.UAH"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11">
            <v-select
              hide-details
              dense
              v-model="selectedCodes"
              :items="codes"
              label="Выберите коды согласно расчетного листа"
              multiple
            ></v-select>
          </v-col>
          <v-col cols="1" class="d-flex justify-end">
            <v-btn icon color="info" @click="addCodes">
              <v-icon>mdi-import</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="py-1 mb-2">
        <v-row v-if="cards.length" class="my-1">
          <v-col class="py-0 text-center" cols="4">
            <div class="caption text-truncate">Начислено:</div>
            <v-chip
              outlined
              small
              label
              color="orange darken-3"
              class="caption text-truncate"
            >
              <v-icon small left>mdi-bank-transfer-in</v-icon>
              {{ accrued || 0 }}
            </v-chip>
          </v-col>
          <v-col class="py-0 text-center" cols="4">
            <div class="caption text-truncate">Удержано:</div>
            <v-chip
              outlined
              small
              label
              color="red darken-3"
              class="caption text-truncate"
            >
              <v-icon small left>mdi-cash-minus</v-icon>
              {{ withheld || 0 }}
            </v-chip>
          </v-col>
          <v-col class="py-0 text-center" cols="4">
            <div class="caption text-truncate">Выплатить:</div>
            <v-chip
              outlined
              small
              label
              color="green darken-3"
              class="caption text-truncate"
            >
              <v-icon small left>mdi-cash-plus</v-icon>
              {{ topayoff || 0 }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
      <v-row
        v-if="cards.length"
        class="mx-1 my-0 grey darken-1 secondary--text"
      >
        <v-col cols="1" class="px-0 py-0 text-center">
          <div class="caption text-uppercase text-truncate">Код</div>
        </v-col>
        <v-col cols="7" class="pr-1 pl-0 py-0 text-center">
          <div class="caption text-uppercase text-truncate">Описание</div>
        </v-col>
        <v-col cols="2" class="px-1 py-0 text-center">
          <div class="caption text-uppercase text-truncate">Время</div>
        </v-col>
        <v-col cols="2" class="px-1 py-0 text-center">
          <div class="caption text-uppercase text-truncate">Знач</div>
        </v-col>
      </v-row>
      <v-list class="pt-0">
        <v-fade-transition group>
          <v-list-item v-for="(stroke, index) in cards" :key="index">
            <v-row class="my-0">
              <v-col cols="1" class="px-0 py-0">
                <v-text-field
                  readonly
                  disabled
                  hide-details
                  v-model="cards[index].code"
                  color="info"
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                :cols="getInfoFromCode(cards[index].code).time ? 7 : 9"
                class="pr-1 pl-0 py-0"
              >
                <v-text-field
                  hide-details
                  dense
                  disabled
                  :value="getInfoFromCode(cards[index].code).description"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="getInfoFromCode(cards[index].code).time"
                cols="2"
                class="px-1 py-0"
              >
                <v-text-field
                  :v-model="cards[index].time"
                  hide-details
                  dense
                  required
                  type="number"
                  :placeholder="String(getLastInfo(cards[index].code, 'time'))"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="px-1 py-0">
                <v-text-field
                  v-if="getInfoFromCode(cards[index].code).value"
                  hide-details
                  type="number"
                  dense
                  required
                  v-model="cards[index].value"
                  :placeholder="String(getLastInfo(cards[index].code, 'value'))"
                ></v-text-field>
              </v-col>
              <!-- <v-select :items="codes" label="Работа"></v-select> -->
            </v-row>
          </v-list-item>
        </v-fade-transition>
        <!-- <v-btn block elevation="1" dense @click="addCode">
          <v-icon left>mdi-plus</v-icon>Добавить код
        </v-btn>-->
      </v-list>
      <v-container class="pt-0">
        <v-checkbox
          v-if="cards.length"
          class="mt-0 mb-2"
          hide-details
          v-model="isCorrect"
        >
          <template v-slot:label>
            <span>Данные расчётов верны?</span>
          </template>
        </v-checkbox>
        <v-btn
          :disabled="!cards.length || !isCorrect"
          color="info"
          block
          type="submit"
        >
          <v-icon left>mdi-export</v-icon>Отправить
        </v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "AddSalary",
  data() {
    return {
      item: "metz",
      showCodes: false,
      dateMenu: false,
      codeList: [],
      codes: [],
      selectedCodes: [6, 39, 46, 50, 51, 208, 900, 902, 908, 910],
      form: {
        date: new Date().toISOString().substr(0, 7),
        USD: 0,
        EUR: 0,
        RUB: 0,
        UAH: 0,
        oklad: +Math.max(
          ...this.$store.getters.getCalculatedPayrolls.map((c) => +c.oklad)
        ),
      },
      cards: [],
      isCorrect: false,
    };
  },
  methods: {
    getInfoFromCode(code) {
      const searched = this.codeList.find((cl) => +cl.code == +code);
      if (searched) {
        return searched;
      }
    },
    getLastInfo(code, prop) {
      const cards = this.$store.getters.getCalculatedPayrolls;
      let lastCode;
      cards.find((c) =>
        c.payments.find((p) => {
          if (p.code == +code) {
            lastCode = p;
            return true;
          }
        })
      );
      if (lastCode) {
        return lastCode[prop];
      }
      return null;
    },
    async getUSD() {
      let raw = await fetch(
        `https://www.nbrb.by/api/exrates/rates/145?ondate=${this.form.date}`
      );
      let cur = await raw.json();
      if (cur.Cur_OfficialRate) {
        this.form.USD = cur.Cur_OfficialRate;
      }
      raw = await fetch(
        `https://www.nbrb.by/api/exrates/rates/292?ondate=${this.form.date}`
      );
      cur = await raw.json();
      if (cur.Cur_OfficialRate) {
        this.form.EUR = cur.Cur_OfficialRate;
      }
      raw = await fetch(
        `https://www.nbrb.by/api/exrates/rates/298?ondate=${this.form.date}`
      );
      cur = await raw.json();
      if (cur.Cur_OfficialRate) {
        this.form.RUB = (cur.Cur_OfficialRate / 100).toFixed(6);
      }
      raw = await fetch(
        `https://www.nbrb.by/api/exrates/rates/290?ondate=${this.form.date}`
      );
      cur = await raw.json();
      if (cur.Cur_OfficialRate) {
        this.form.UAH = (cur.Cur_OfficialRate / 100).toFixed(6);
      }
    },
    addCodes() {
      this.selectedCodes.forEach((sc) => {
        if (this.cards.every((c) => c.code != sc)) {
          let obj = {};
          obj.code = sc;
          obj.time = null;
          obj.value = null;
          this.cards.push(obj);
        }
      });
      this.cards = this.cards
        .filter((c) => this.selectedCodes.some((sc) => sc == c.code))
        .sort((a, b) => {
          if (a.code > b.code) {
            return 1;
          }
          if (a.code < b.code) {
            return -1;
          }
          return 0;
        });
    },
    deleteCard(i) {
      this.codes.push(this.cards[i].code);
      this.cards = this.cards.filter((c, index) => index != i);
    },
    addSalary() {
      let body = this.form;
      body.payments = this.cards;
      this.$store.dispatch("setPayroll", JSON.stringify(body));
      this.$emit("close");
    },
    allowedMonths(val) {
      let now = new Date();
      now.setMonth(now.getMonth() - 1);
      return (
        this.$store.getters.getCalculatedPayrolls.every(
          (mp) => mp.date != val
        ) && new Date(val) < now
      );
    },
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
  },
  mounted() {
    this.codeList = this.$store.getters.getMetzCodes;
    this.codes = this.codeList.map((c) => c.code);
    this.getUSD();
  },
  computed: {
    accrued() {
      if (this.cards.length) {
        const cards = this.cards
          .filter(
            (p) => p.value && this.getFromCode(p.code, "condition") == "income"
          )
          .map((p) => +p.value);
        if (cards.length) {
          return cards.reduce((a, b) => a + b).toFixed(2);
        }
        return "";
      }
      return "";
    },
    withheld() {
      if (this.cards.length) {
        const cards = this.cards
          .filter(
            (p) => p.value && this.getFromCode(p.code, "condition") != "income"
          )
          .map((p) => +p.value);
        if (cards.length) {
          return cards.reduce((a, b) => a + b).toFixed(2);
        }
        return "";
      }
      return "";
    },
    topayoff() {
      return (this.accrued - this.withheld).toFixed(2);
    },
  },
};
</script>
<style scoped>
.v-list-item {
  min-height: auto !important;
}
</style>