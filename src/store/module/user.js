import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'

export default {
  state: {
    access_token: LocalStorage.getItem('access_token') || null,
    refresh_token: LocalStorage.getItem('refresh_token') || null,
    username: LocalStorage.getItem('username') || null,
    uid: LocalStorage.getItem('uid') || null,
  },
  getters: {
    isLogged(state) {
      return state.username != null
    },
    getUid(state) {
      return state.uid
    },
    getUsername(state) {
      return state.username
    },
  },
  mutations: {
    setTokens(state, { access, refresh }) {
      LocalStorage.set('access_token', 'Bearer ' + access)
      LocalStorage.set('refresh_token', refresh)
      state.access_token = access
      state.refresh_token = refresh
    },
    setUsername(state, username) {
      state.username = username
      LocalStorage.set('username', username)
    },
    setUid(state, uid) {
      state.uid = uid
      LocalStorage.set('uid', uid)
    },
    updateAccess(state, access) {
      state.access_token = access
    },
    removeTokens(state) {
      state.access_token = null
      state.refresh_token = null
      state.username = null
      state.uid = null
      LocalStorage.remove('access_token')
      LocalStorage.remove('refresh_token')
      LocalStorage.remove('username')
      LocalStorage.remove('uid')

      console.log('成功注销')
    },
  },
  actions: {
    refreshToken(context) {
      return new Promise((resolve, reject) => {
        api
          .post('/api/token/refresh/', {
            refresh: context.state.refresh_token,
          })
          .then((response) => {
            console.log('New access successfully generated.')
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch((err) => {
            console.log('error in refreshToken Task')
            reject(err)
          })
      })
    },
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        api
          .post('/api/token/', {
            username: credentials.username,
            password: credentials.password,
          })
          .then((response) => {
            context.commit('setTokens', {
              access: response.data.access,
              refresh: response.data.refresh,
            })
            context.commit('setUsername', credentials.username)
            api
              .get('/api/userpro?username=' + context.state.username)
              .then((res) => {
                context.commit('setUid', res.data.results[0].user)
              })
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // register(context, data) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .post("/register", {
    //         name: data.name,
    //         email: data.email,
    //         username: data.username,
    //         password: data.password,
    //         confirm: data.confirm
    //       })
    //       .then(response => {
    //         resolve(response);
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    logout(context) {
      if (context.getters.isLogged) {
        context.commit('removeTokens')
      }
    },
    validateToken(context) {
      return context.state.access_token != null
    },
  },
}
