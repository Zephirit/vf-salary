import firebase from 'firebase/app'
import router from '@/router'
export default {
	actions: {
		async submit({
			dispatch,
			commit
		}, {
			email,
			password
		}) {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password)
				dispatch("getUserInfo")
				router.push({
					name: 'Home'
				})
				commit("setAlert", {
					message: "Вы войдены",
					type: "success",
					mdi: "mdi-account"
				});
			} catch (error) {
				commit("setAlert", {
					message: error,
					type: "error"
				});
			}

		},
		async register({
			dispatch,
			commit
		}, {
			name,
			email,
			password
		}) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch("getUid")
				await firebase.database().ref(`/users/${uid}/info`).set({
					name,
					isAdmin: false
				})
				commit("setAlert", {
					message: "Вы успешно зарегистрировались",
					type: "success",
					mdi: "mdi-account"
				});
				dispatch("getUserInfo")
			} catch (error) {
				commit("setAlert", {
					message: error,
					type: "error"
				});
			}
		},
		getUid() {
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
		getAuth() {
			const user = firebase.auth().currentUser
			return user ? user : null
		},
		async logout({
			commit
		}) {
			await firebase.auth().signOut()
			commit("setUser", {
				name: '',
				isAdmin: false,
				isAuth: false
			})
			commit("clearData")
			router.push({
				name: 'Login'
			})
		},
	}
}