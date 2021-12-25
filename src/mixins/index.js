const mixin = {
	methods: {
		tolocal(d, m = "2-digit") {
			return new Date(d).toLocaleString("ru", {
				year: "numeric",
				month: m,
				day: "numeric",
			});
		},
		getRuMonth(string) {
			const year = string.substr(0, 4);
			const month = string.substr(5, 2);
			return new Date(year, month - 1).toLocaleString("ru", {
				year: "numeric",
				month: "short"
			});
		},
		rmspace(string) {
			return string.replace(/\s+/g, '')
		}
	},
	computed: {
		tolocalMonth() {
			const year = this.payroll.date.substr(0, 4);
			const month = this.payroll.date.substr(5, 2);
			return new Date(year, month - 1).toLocaleString("ru", {
				year: "numeric",
				month: "long"
			});
		}
	}
}

export default mixin