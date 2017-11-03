import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../framework/Home'
import Login from '../framework/Login'
import User from '../framework/User'

const Err404 = require('../framework/Error')
const Err401 = require('../framework/401')

const personal = resolve => require(['../framework/Personal'], resolve)
const personalInfo = resolve => require(['../framework/personal/Info'], resolve)
const personalAbout = resolve => require(['../framework/personal/About'], resolve)
const personalFeedback = resolve => require(['../framework/personal/Feedback'], resolve)
const print = resolve => require(['../framework/Print'], resolve)
const printPayOrder = resolve => require(['@/biz/print/payOrder'], resolve)

const home = resolve => require(['@/sys/home'], resolve)
const userInput = resolve => require(['@/biz/input'], resolve)
const Search = resolve => require(['@/biz/search'], resolve)
const Review = resolve => require(['@/biz/review'], resolve)
const Admin = resolve => require(['@/biz/admin'], resolve)

const routes = [
  { path: '/login', component: Login, name: '登录' },
  { path: '/search', component: Search, name: '搜索' },
  {
    path: '/',
    component: Main,
    redirect: '/home',
    name: 'ep',
    children: [
      { path: 'home', component: home, name: '首页', icon: 'home' },
      { path: 'review', component: Admin, name: '审单', icon: 'input' }
    ]
  },
  {
    path: '/user',
    component: User,
    name: '个人账号中心',
    redirect: '/user/input',
    children: [
      { path: '/user/input', name: '信息录入', component: userInput }
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
