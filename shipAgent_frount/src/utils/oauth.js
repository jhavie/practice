/**
 * 权限控制
 * @author: Merjiezo
 * @since: 2017-05-26
 */
import Vue from 'vue'
import localStorage from './localStorage'
import { post } from './fetch'
import store from '../vuex/store'

/*cookie过期时间——5天*/
const cookieOutDate = 5
/**白名单存储在此 */
let menus = '';

/** 白名单列表 */
function menuToStr (menus) {
  let res = '';

  menus.forEach((item) => {
    if (item.router) {
      res += '#' + item.router 
    }
    if (item.children !== undefined && item.children.length > 0) {
      let children = item.children
      children.forEach((item) => {
        if (item.router) {
          res += '#' + item.router
        }
      })
    }
  })
  return res
}

/** 登陆 */
export function login (form) {
  post('sysLogin', form)
  .then(json => {
    cookie.setCookie('eptoken', json.data.rt, cookieOutDate)
    router.push('home')
  }).catch(e => {})
}

/** 登出 **/
export function logout () {
  const token = cookie.getCookie('eptoken')
  if (token !== '') {
    post('sysLogout', {
      refreshToken: token
    }).then(json => {
      cookie.delCookie('eptoken')
      router.push('login')
    }).catch(e => {})
  } else {
    router.push('login')
  }
}

// TODO 需要添加主动踢出操作
/** 获取菜单 **/
export function getMenu (fn) {
  post('getSysMenu', undefined).then ((json) => {
    // 后台过来的menu
    let router = json.data.sysMenu
    store.dispatch('setRouterJson', router)
    menus = menuToStr(router)
    fn.call(this, router)
  }).catch ((e) => {
    // 待开发
  })
}

/***
 * 获取用户权限
 * @route    路由路径
 * @callback 回调函数
 */
export function getPermission (route, callback) {
  if (route.startWith('/')) {
    route = route.substring(1)
  }
  if (menus === '') {
    getMenu((json) => {
      if (menus.indexOf(route) === -1) {
        callback.call(this, false)
      } else {
        callback.call(this, true)
      }
    })
  } else {
    if (menus.indexOf(route) === -1) {
      callback.call(this, false)
    } else {
      callback.call(this, true)
    }
  }
}

/**
 * 获取用户Token
 */
export function getToken () {
  // return localStorage.getLocalStorage('eptoken')
  return 'RT-230-ywrMDPox8alOR9dMszDKpGbmjDBUXmV0DkCRkpIAiSkOSsuLqB'
}

export function setToken (token, oid) {
  localStorage.setLocalStorage('eptoken', token, 20)
}

/**
 * 获取用户Token
 */
export function delToken () {
  localStorage.delLocalStorage('eptoken')
}
