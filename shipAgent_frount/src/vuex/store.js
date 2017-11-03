import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cookie from '../utils/cookie'

Vue.use(Vuex);

const color = 'blue,dark-blue,green,pupple,orange'

function getTheme () {
    const theme = cookie.getCookie('theme')
    if (theme !== '' && color.indexOf(theme) !== -1) {
        return theme
    } else {
        cookie.setCookie('theme', 'blue')
        return 'blue'
    }
}

// 应用初始状态
const state = {
    routerJson: [],
    changeWidth: 0,
    theme: getTheme(),
    captchaStatus: {},
    refresh_token : '',
    randomStr : '',//登录的随机数
    menuTabs: [
        { name: '首页', path: 'home', icon: 'ios-home' }
    ],
    nowPath: '/'
};

// 定义所需的 mutations
const mutations = {
    SETCHANGEWIDTH(state,newChangeWidth) {
        state.changeWidth = newChangeWidth;
    },
    SETTHENE(state,newTheme) {
        state.theme = newTheme;
    },
    CHANGECAPTCHSTATUS(state,newCaptchaStatus) {
        state.captchaStatus = newCaptchaStatus;
    },
    CHANGEMENUTABS(state,newTabs) {
        state.menuTabs = newTabs
    },
    CHANGENOWPATH(state,nowPath) {
        state.nowPath = nowPath
    },
    SETREFRESH_TOKEN(state,refresh_token){
        state.refresh_token = refresh_token
    },
    SETRANDOMSTR(state,randomStr){
        state.randomStr = randomStr
    },
    SETROUTERJSON(state,newRouterJson) {
        state.routerJson = newRouterJson;
    },
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})