import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import auth from './auth'
import salary from './salary'


Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: {
      isAuth: false,
      isAdmin: false,
      name: ''
    },
    settings: {
      colors: {
        light: {
          primary: '#20194D',
          secondary: '#F1EDE9',
          accent: '#B41A45',
          background: '#DCDDDC',
        }
      },
    },
    isEdited: false,
    alert: {
      show: false,
      message: '',
      type: '',
      mdi: ''
    },


  },
  getters: {
    getUser: state => {
      return state.user
    },
    getSettings: state => state.settings,
    getIsEdited: state => {
      return state.isEdited
    },
    getAlert: state => {
      return state.alert
    },


  },
  mutations: {
    setUser: (state, options) => {
      state.user.name = options.name
      state.user.isAuth = options.isAuth
      state.user.isAdmin = options.isAdmin
    },
    setAlert: (state, payload) => {
      state.alert.show = true
      state.alert.message = payload.message
      state.alert.type = payload.type || "success"
      state.alert.mdi = payload.mdi || "mdi-emoticon-cool"
    },
    useSettings: (state, payload) => state.settings = payload,
    setIsEdited: (state, payload) => {
      state.isEdited = payload
    }
  },
  actions: {

    async updateMetz({
      commit,
      dispatch
    }) {
      const uid = await dispatch("getUid")
      let metz = (await firebase.database().ref(`/users/${uid}/jobs/metz/`).once('value')).val()
      commit("setAlert", {
        message: "Сделано",
        type: "success",
        mdi: "mdi-cash"
      });
      for (let prop in metz.cards) {
        const USDRaw = await fetch(
          `https://www.nbrb.by/api/exrates/rates/145?ondate=${metz.cards[prop].date}`
        );
        const USDRCur = await USDRaw.json();
        if (USDRCur.Cur_OfficialRate) {
          metz.cards[prop].USD = USDRCur.Cur_OfficialRate
          metz.cards[prop].kurs = null
        }
        const EURRaw = await fetch(
          `https://www.nbrb.by/api/exrates/rates/292?ondate=${metz.cards[prop].date}`
        );
        const EURRCur = await EURRaw.json();
        if (EURRCur.Cur_OfficialRate) {
          metz.cards[prop].EUR = EURRCur.Cur_OfficialRate
        }
        const RUBRaw = await fetch(
          `https://www.nbrb.by/api/exrates/rates/298?ondate=${metz.cards[prop].date}`
        );
        const RUBRCur = await RUBRaw.json();
        if (RUBRCur.Cur_OfficialRate) {
          metz.cards[prop].RUB = +(RUBRCur.Cur_OfficialRate / 100).toFixed(6)
        }
        const UAHRaw = await fetch(
          `https://www.nbrb.by/api/exrates/rates/290?ondate=${metz.cards[prop].date}`
        );
        const UAHRCur = await UAHRaw.json();
        if (UAHRCur.Cur_OfficialRate) {
          metz.cards[prop].UAH = +(UAHRCur.Cur_OfficialRate / 100).toFixed(6)
        }
      }
      await firebase.database().ref(`users/${uid}/jobs/metz/`).set(metz)
    },
    async getUserInfo({
      dispatch,
      commit
    }) {
      const uid = await dispatch("getUid")
      if (uid) {
        const user = (await firebase.database().ref(`/users/${uid}`).once('value')).val()
        commit("setUser", {
          name: user.info.name,
          isAdmin: user.info.isAdmin,
          isAuth: true
        })
        commit("setJobs", user.jobs)
        commit("useSettings", user.info.settings)
        await dispatch("getCodes", user.jobs)
        commit("setLoad", 'connected')
      }
    },
    async saveSettigns({
      commit,
      dispatch
    }, payload) {
      const uid = await dispatch("getUid")
      await firebase.database().ref(`/users/${uid}/info/settings`).set(payload)
      commit("setAlert", {
        message: "Настройки обновлены",
        type: "success",
        mdi: "mdi-cog"
      });
      commit("useSettings", payload)
    },
  },
  modules: {
    auth,
    salary,
  }
})