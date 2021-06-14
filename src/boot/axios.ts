import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { LocalStorage } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

// // 根据环境选择后端服务器
if (process.env.DEV) {
  axios.defaults.baseURL = 'http://127.0.0.1:8000/'

  // axios.defaults.baseURL = "http://evensyell.ml/";
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:8000/'
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// export const api = axios.create({ baseURL: 'http://127.0.0.1:8000/' })
const api = axios.create()

api.interceptors.request.use(
  (config) => {
    // 后台使用jwt时候发送post请求必须使用 formdata模式
    if (config.method == 'post' || config.method == 'put') {
      const formData = new FormData()
      Object.keys(config.data).forEach((key) => {
        if (config.data[key] instanceof Array) {
          for (var i = 0; i < config.data[key].length; i++) {
            formData.append(key, config.data[key][i])
          }
        } else {
          formData.append(key, config.data[key])
        }
      })
      config.data = formData
      // }
      // if (store.dispatch('getToken')) {
      console.log('request add token')
      config.headers.Authorization = LocalStorage.getItem('access_token')
    }
    if (config.method == 'delete') {
      config.headers.Authorization = LocalStorage.getItem('access_token')
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么，自己定义
    console.log('error: ', error)
    return Promise.reject(error)
  }
)

// const api = axios.create()
export default boot(({ app }) => {
  //   // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  //   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //   //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  //   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //   //       so you can easily perform requests against your app's API
})

export { api }
