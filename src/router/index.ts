import { LocalStorage } from 'quasar'
import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { StateInterface } from '../store'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  })

  // **导航守卫 划分Admin页面权限
  Router.beforeEach(async (to, from, next) => {
    if (!to.meta.requireAuth) {
      return next()
    }

    // const hasToken = store.dispatch('validateToken')
    const hasToken = LocalStorage.getItem('access_token')
    if (hasToken) {
      if (LocalStorage.getItem('username') == 'evensyell') {
        next()
      } else {
        next('/index')
      }
    } else {
      const requireAuth = to.matched.some((item) => item.meta.requireAuth)
      if (requireAuth) {
        next('/index')
      } else {
        next()
      }
    }
  })

  return Router
})
