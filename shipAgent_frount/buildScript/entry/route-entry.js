var Components = require('../../router');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');

var OUTPUT_PATH = path.join(__dirname, '../../src/router/index.js');
/* BIZ 装配 */
var IMPORT_BIZ_TEMPLATE = 'const {{name}} = resolve => require([\'@/biz/{{file}}\'], resolve)'
/* SYS 装配 */
var IMPORT_SYS_TEMPLATE = 'const {{name}} = resolve => require([\'@/sys/{{file}}\'], resolve)'
/* 路由装配 */
var IMPORT_PATH = '{ path: \'{{path}}\', component: {{component}}, name: \'{{name}}\', icon: \'{{icon}}\' }'
const MAIN_TEMPLATE = `import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../framework/Home'
import Login from '../framework/Login'

const Err404 = require('../framework/Error')
const Err401 = require('../framework/401')

const personal = resolve => require(['../framework/Personal'], resolve)
const personalInfo = resolve => require(['../framework/personal/Info'], resolve)
const personalAbout = resolve => require(['../framework/personal/About'], resolve)
const personalFeedback = resolve => require(['../framework/personal/Feedback'], resolve)
const print = resolve => require(['../framework/Print'], resolve)
const printPayOrder = resolve => require(['@/biz/print/payOrder'], resolve)

{{sys}}

{{biz}}

const routes = [
  { path: '/login', component: Login, name: '登录' },
  {
    path: '/',
    component: Main,
    redirect: '/home',
    name: 'ep',
    children: [
      {{router}}
    ]
  },
  {
    path: '/personal',
    component: personal,
    name: '个人账号中心',
    redirect: '/personal/info',
    children: [
      { path: '/personal/info', name: '个人信息', component: personalInfo },
      { path: '/personal/about', name: '关于我们', component: personalAbout },
      { path: '/personal/feedback', name: '联系我们', component: personalFeedback }
    ]
  },
  {
    path: '/print',
    component: print,
    name: '打印',
    redirect: '/print/payOrder',
    children: [
      { path: '/print/payOrder', name: '打印信息', component: printPayOrder }
    ]
  },
  { path: '/401', name: '401 No Permission!', component: Err401 },
  { path: '/*', name: '404 not found!', component: Err404 }
]

export default new Router({
  routes: routes
})
`

var JSON_SYS = Components.sys
var JSON_BIZ = Components.biz
var SysTemplate = []
var BizTemplate = []
var routerTemplate = []

for (var item in JSON_SYS) {
  var name = item.slice(1)
  SysTemplate.push(render(IMPORT_SYS_TEMPLATE, {
    name: name,
    file: JSON_SYS[item].router
  }))
  routerTemplate.push(render(IMPORT_PATH, {
    path: name,
    component: name,
    name: JSON_SYS[item].name,
    icon: JSON_SYS[item].icon? JSON_SYS[item].icon: null
  }))
}

for (var itemBiz in JSON_BIZ) {
  var name = itemBiz.slice(1)
  BizTemplate.push(render(IMPORT_BIZ_TEMPLATE, {
    name: name,
    file: JSON_BIZ[itemBiz].router
  }))
  routerTemplate.push(render(IMPORT_PATH, {
    path: name,
    component: name,
    name: JSON_BIZ[itemBiz].name,
    icon: JSON_BIZ[itemBiz].icon? JSON_BIZ[itemBiz].icon: null
  }))
}


var template = render(MAIN_TEMPLATE, {
  sys: SysTemplate.join('\n'),
  biz: BizTemplate.join('\n'),
  router: routerTemplate.join(',\n      ')
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build router entry] DONE:', OUTPUT_PATH);
