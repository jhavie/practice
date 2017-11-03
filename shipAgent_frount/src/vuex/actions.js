import cookie from '../utils/cookie'
const color = 'blue,dark-blue,green,pupple,orange'

export const setChangeWidth = ({commit}, changeWidth) => {
    commit('SETCHANGEWIDTH', changeWidth)
};
export const setTheme = ({commit}, theme) => {
	let style = ''
	if (color.indexOf(theme) !== -1) {
		style = theme
	} else {
		style = blue
	}
	cookie.setCookie('theme', style)
    commit('SETTHENE', style)
};
export const changeCaptchstatus = ({commit},captchaStatus) => {
    commit('CHANGECAPTCHSTATUS',captchaStatus)
};
export const changeMenuTabs = ({commit},newTabs) => {
    commit('CHANGEMENUTABS',newTabs)
};
export const changeNowPath = ({commit},nowPath) => {
    commit('CHANGENOWPATH',nowPath)
};
export const setRefreshToken = ({commit},refresh_token) => {
    commit('SETREFRESH_TOKEN',refresh_token)
};
export const setRandomStr = ({commit},randomStr) => {
    commit('SETRANDOMSTR',randomStr)
};
export const setRouterJson = ({commit},routerJson) => {
    commit('SETROUTERJSON',routerJson)
};