import firebase from 'firebase/app'
export default {
	state: {
		codes: {},
		jobs: {},
		payrolls: [],
		pull: ["clear"],
		statistic: {
			allTime: {},
			onYears: {},
			lastYear: {},
			last3Months: {}
		},
		loaded: "empty",
		calculated: false,
		prepaid: [902, 909, 927],
	},
	getters: {
		getMetzCodes: state => state.codes.metz.codes,
		getPrepaid: state => state.prepaid,
		getPay: state => state.pay,
		getJobs: state => state.jobs,
		getCalculatedPayrolls: state => state.payrolls,
		getStatistic: state => state.statistic,
		calculated: state => state.calculated,
		getPull: state => state.pull,
		getFromLoadingStatus: state => {
			if (state.loaded == 'empty') {
				return {
					color: 'blue darken-1',
					status: "Пытаюсь достучаться до облаков...",
					mdi: 'mdi-cloud-question'
				}
			} else if (state.loaded == 'connected') {
				return {
					color: 'teal darken-3',
					status: `Cчитаю твои крохи...`,
					mdi: 'mdi-calculator-variant'
				}
			} else {
				return {
					color: 'blue darken-1',
					status: "Что-то я запутался...",
					mdi: 'mdi-head-question'
				}
			}
		},
		loaded: state => state.loaded,
	},
	mutations: {
		setCodes: (state, payload) => state.codes = payload,
		setPay: (state, payload) => state.pay = payload,
		setJobs: (state, payload) => state.jobs = payload,
		setPull: (state, payload) => state.pull = payload,
		pushPull: (state, payload) => {
			if (state.pull.some(p => p == payload)) {
				state.pull = state.pull.filter(p => p != payload)
			} else {
				state.pull.push(payload)
			}

		},
		setLoad: (state, payload) => {
			state.loaded = payload
		},
		calculate: (state) => {

			const getFromCode = (code, prop) => {
				const result = state.codes.metz.codes.find(
					c => +c.code == +code
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
			};
			state.payrolls = Object.values(state.jobs.metz.cards).map(c => {
				c.year = +c.date.substr(0, 4);
				c.month = +c.date.substr(5, 2);
				c.calculations = {}
				c.calculations.workDays = {}
				c.calculations.workDays.name = "Дней"
				c.calculations.workDays.value = +c.payments.find(c => c.code == 6).time
				c.calculations.salary = {}
				c.calculations.salary.name = "Оклад"
				c.calculations.salary.value = +c.oklad
				c.calculations.accrued = {}
				c.calculations.accrued.name = "Начислено"
				c.calculations.accrued.value = +c.payments
					.filter(p => p.value && getFromCode(p.code, "condition") == "income")
					.map(p => +p.value)
					.reduce((a, b) => a + b)
					.toFixed(2)
				c.calculations.withheld = {}
				c.calculations.withheld.name = "Удержано"
				c.calculations.withheld.value = +c.payments
					.filter(p => p.value && getFromCode(p.code, "condition") != "income")
					.map(p => +p.value)
					.reduce((a, b) => a + b)
					.toFixed(2)
				c.calculations.topayof = {}
				c.calculations.topayof.name = "Выплатить"
				c.calculations.topayof.value = +(c.calculations.accrued.value - c.calculations.withheld.value).toFixed(2)
				c.calculations.prepaid = {}
				c.calculations.prepaid.name = "Предоплачено"
				c.calculations.prepaid.value = +c.payments
					.filter(p => p.value && getFromCode(p.code, "condition") != "income" && !state.prepaid.some(pp => pp == p.code))
					.map(p => +p.value)
					.reduce((a, b) => a + b)
					.toFixed(2);
				c.calculations.clear = {}
				c.calculations.clear.name = "BYN(месяц)"
				c.calculations.clear.value = +(c.calculations.accrued.value - c.calculations.prepaid.value).toFixed(2);
				c.calculations.clearInDay = {}
				c.calculations.clearInDay.name = "BYN(день)"
				c.calculations.clearInDay.value = +(c.calculations.clear.value / c.calculations.workDays.value).toFixed(2)
				c.calculations.clearInHour = {}
				c.calculations.clearInHour.name = "BYN(час)"
				c.calculations.clearInHour.value = +(c.calculations.clearInDay.value / 8).toFixed(2)
				c.calculations.USD = {}
				c.calculations.USD.name = "USD(месяц)"
				c.calculations.USD.value = +(c.calculations.clear.value / c.USD).toFixed(2);
				c.calculations.USDInDay = {}
				c.calculations.USDInDay.name = "USD(день)"
				c.calculations.USDInDay.value = +(c.calculations.USD.value / c.calculations.workDays.value).toFixed(2)
				c.calculations.USDInHour = {}
				c.calculations.USDInHour.name = "USD(час)"
				c.calculations.USDInHour.value = +(c.calculations.USDInDay.value / 8).toFixed(2)
				c.calculations.EUR = {}
				c.calculations.EUR.name = "EUR(месяц)"
				c.calculations.EUR.value = +(c.calculations.clear.value / c.EUR).toFixed(2);
				c.calculations.EURInDay = {}
				c.calculations.EURInDay.name = "EUR(день)"
				c.calculations.EURInDay.value = +(c.calculations.EUR.value / c.calculations.workDays.value).toFixed(2)
				c.calculations.EURInHour = {}
				c.calculations.EURInHour.name = "EUR(час)"
				c.calculations.EURInHour.value = +(c.calculations.EURInDay.value / 8).toFixed(2)
				c.calculations.RUB = {}
				c.calculations.RUB.name = "RUB(месяц)"
				c.calculations.RUB.value = +(c.calculations.clear.value / c.RUB).toFixed(0);
				c.calculations.RUBInDay = {}
				c.calculations.RUBInDay.name = "RUB(день)"
				c.calculations.RUBInDay.value = +(c.calculations.RUB.value / c.calculations.workDays.value).toFixed(2)
				c.calculations.RUBInHour = {}
				c.calculations.RUBInHour.name = "RUB(час)"
				c.calculations.RUBInHour.value = +(c.calculations.RUBInDay.value / 8).toFixed(2)
				c.calculations.UAH = {}
				c.calculations.UAH.name = "UAH(месяц)"
				c.calculations.UAH.value = +(c.calculations.clear.value / c.UAH).toFixed(0);
				c.calculations.UAHInDay = {}
				c.calculations.UAHInDay.name = "UAH(день)"
				c.calculations.UAHInDay.value = +(c.calculations.UAH.value / c.calculations.workDays.value).toFixed(2)
				c.calculations.UAHInHour = {}
				c.calculations.UAHInHour.name = "UAH(час)"
				c.calculations.UAHInHour.value = +(c.calculations.UAHInDay.value / 8).toFixed(2)
				state.codes.metz.codes.forEach(code => {
					if (code.time) {
						c.calculations[`${code.code}Time`] = {}
						c.calculations[`${code.code}Time`].name = `Код ${code.code}(время)`
						if (c.payments.some(p => +p.code == +code.code)) {
							c.calculations[`${code.code}Time`].value = +c.payments.find(p => +p.code == +code.code).time
						} else {
							c.calculations[`${code.code}Time`].value = null
						}

					}
					if (code.value) {
						c.calculations[`${code.code}Value`] = {}
						c.calculations[`${code.code}Value`].name = `Код ${code.code}(сумма)`
						if (c.payments.some(p => +p.code == +code.code)) {
							c.calculations[`${code.code}Value`].value = +c.payments.find(p => +p.code == +code.code).value
						} else {
							c.calculations[`${code.code}Value`].value = null
						}
					}
				});
				return c
			}).sort((a, b) => {
				if (a.date < b.date) {
					return 1;
				}
				if (a.date > b.date) {
					return -1;
				}
				return 0;
			})
			state.statistic.allTime.accrued = +state.payrolls.map(at => +at.calculations.accrued.value).reduce((a, b) => a + b).toFixed(2)
			state.statistic.allTime.clear = +state.payrolls.map(at => +at.calculations.clear.value).reduce((a, b) => a + b).toFixed(2)
			state.statistic.allTime.taxes = +(state.statistic.allTime.accrued.value - state.statistic.allTime.clear.value).toFixed(2)
			state.statistic.lastYear.accrued = +state.payrolls.filter((at, i) => i < 12).map(at => +at.calculations.accrued.value).reduce((a, b) => a + b).toFixed(2)
			state.statistic.lastYear.clear = +state.payrolls.filter((at, i) => i < 12).map(at => +at.calculations.clear.value).reduce((a, b) => a + b).toFixed(2)
			state.statistic.lastYear.taxes = +(state.statistic.lastYear.accrued.value - state.statistic.lastYear.clear.value).toFixed(2)
			state.statistic.last3Months.accrued = +(state.payrolls.filter((at, i) => i < 3).map(at => +at.calculations.accrued.value).reduce((a, b) => a + b) / 3).toFixed(2)
			state.statistic.last3Months.clear = +(state.payrolls.filter((at, i) => i < 3).map(at => +at.calculations.clear.value).reduce((a, b) => a + b) / 3).toFixed(2)
			state.statistic.last3Months.taxes = +(state.statistic.last3Months.accrued.value - state.statistic.last3Months.clear.value).toFixed(2)
			setTimeout(() => {
				state.calculated = true
				state.loaded = "completed"
			}, 100);

		},
		clearData: (state) => {
			state.jobs = {};
			state.payrolls = [];
			state.statistic = {
				allTime: {},
				onYears: {},
				lastYear: {},
				last3Months: {}
			}
			state.calculated = false
		}
	},
	actions: {
		async getCodes({
			commit,
		}) {
			const j = (await firebase.database().ref(`/jobs/`).once('value')).val()

			commit("setCodes", j)
			commit("calculate")
		},
		async setPayroll({
			commit,
			dispatch
		}, payload) {
			const uid = await dispatch("getUid")
			await firebase.database().ref(`/users/${uid}/jobs/metz/cards`).push(JSON.parse(payload))

			commit("setAlert", {
				message: "Расчетник добавлен",
				type: "success",
				mdi: "mdi-cash"
			});
			const jobs = (await firebase.database().ref(`/users/${uid}/jobs`).once('value')).val()
			commit("setJobs", jobs)
		},
		async deletePayroll({
			dispatch,
			commit,
		}, id) {
			const uid = await dispatch("getUid")
			await firebase.database().ref(`/users/${uid}/jobs/metz/cards/${id}`).set(null)
			commit("setAlert", {
				message: "Расчетник удален",
				type: "success",
				mdi: "mdi-trash-can"
			});
		},
	}
}