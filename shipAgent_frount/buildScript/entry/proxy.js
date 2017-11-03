import Vue from 'vue'
import vueRouter from 'vue-router'
import json from './setting'

Vue.use(vueRouter)

/***
 * 动态配置路由
 */
function setRouter (json) {
  let routes = [];

  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      const main = json[key]
      let rou = {
        name: main.name,
        path: key,
        icon: main.icon,
        component: require(`../${main.router}`)
        // component: resolve => require([`../${main.router}`], resolve)
      }
      if (main.hasChildren) {
        rou.children = []
      }
      if (main.redirect) {
        rou.redirect = main.redirect
      }
      routes.push(rou)
    }
  }
  return routes;
}

const framework = json.framework
const sys = json.sys
const biz = json.biz
let routes = []
routes = setRouter(framework)

if (routes.length > 0 && routes[1].path === '/') {
  let homeRouter = []
  if (sys !== {}) {
    homeRouter = homeRouter.concat(setRouter(sys))
  }
  if (biz !== {}) {
    homeRouter = homeRouter.concat(setRouter(biz))
  }
  routes[1].children = homeRouter
} else {
  throw new Error('Framework Router Error!')
}
console.log(routes)


export default new vueRouter({
  routes: routes
})
