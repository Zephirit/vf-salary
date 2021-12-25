import Vue from 'vue'
import store from '../store'
Vue.directive('dblboard', (el) => {
	el.ondblclick = e => {
		if (navigator.clipboard) {
			navigator.clipboard.readText().then(
				(text) => {
					e.target.value = text
					e.target.dispatchEvent(new Event("input"))
					store.dispatch('callAlert', {
						message: "Текст вставлен из буфера",
						type: "info",
						mdi: "mdi-clipboard-arrow-down"
					});
				},
				(err) => {
					Vue.$toast.error(err);
				}
			);
		}
	}
})
Vue.directive('BYN', (el) => {
	let formatter = new Intl.NumberFormat("ru", {
		style: "currency",
		currency: "BYN"
	});
	el.innerText = formatter.format(el.innerText)
})
Vue.directive('rmspace', (el) => {
	el.innerText = el.innerText.replace(/\s+/g, '')
})

Vue.directive('copy', (el) => {
	el.onclick = e => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(e.target.previousSibling.innerText).then(
				() => {
					Vue.$toast.success("Текст скопирован");
				},
				(err) => {
					Vue.$toast.error(err);
				}
			);
		}
	}
})
Vue.directive('rCopy', (el) => {
	el.addEventListener("contextmenu", e => {
		e.preventDefault()
		if (navigator.clipboard) {
			navigator.clipboard.writeText(e.target.innerText).then(
				() => {
					store.dispatch('callAlert', {
						message: "Текст скопирован",
						type: 'info',
						mdi: "mdi-clipboard"
					});
				},
				(err) => {
					store.dispatche('callAlert', {
						message: err,
						type: "error",
						mdi: "mdi-alert-circle"
					});
				}
			);
		}
	})
})
Vue.directive('date', (el) => {
	const date = el.innerText
	const year = date.substr(0, 4);
	const month = date.substr(4, 2);
	const day = date.substr(6, 2);
	el.innerText = year + "-" + month + "-" + day;
})