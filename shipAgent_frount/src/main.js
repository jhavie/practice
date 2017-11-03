// The Vue build version to   load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import 'element-ui/lib/theme-default/index.css'

import './ep-ui/package'            // EP UI 组件库
import NProgress from 'nprogress'   // 页面顶部进度条
import swal from 'sweetalert'       // Sweet Alert
import './common/config'            // 全局配置
import 'utils/string'               // String操作方法
import { post, get, getToken, getPermission, getTabRow } from 'utils'
import { Loading } from 'element-ui';
// import '../mock'
Vue.use(Loading)
Vue.prototype.$err = function (info) {
  this.$pop({
    type: 'danger',
    message: info
  })
}
Vue.prototype.$warn = function (info) {
  this.$pop({
    type: 'warning',
    message: info
  })
}

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$confirm = swal

// 白名单
const whiteList = ['/login', '/signin', '/404', '/401']                                                             // 登陆前不重定向白名单
const loginWhiteList = [ '/home', '/personal/info', '/personal/about', '/personal/feedback', '/print/payOrder' ]    // 登录后不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()

  // if (getToken() !== '') {
  //   if (to.path === '/login') {
  //     next('/')
  //   } else {
  //     if (whiteList.indexOf(to.path) !== -1 ||
  //       loginWhiteList.indexOf(to.path) !== -1) {
  //       next()
  //     } else {
  //       getPermission(to.path, (canGo) => {
  //         if (canGo) {
  //           next()
  //         } else {
  //           next('/401')
  //         }
  //       })
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
