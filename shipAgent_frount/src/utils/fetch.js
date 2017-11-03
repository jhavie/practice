/**
 * Ajax操作类，运用fetch技术
 * 所有内容采用JSON传输（暂时）
 * @author: Merjiezo
 * @since: 2017-05-11
 */
import Vue from 'vue'
import md5 from 'blueimp-md5'
import api from '../api.json'
import fetchJsonp from 'fetch-jsonp'
import Message from '../ep-ui/package/message'
import { obj2UrlForm, dataErr } from './data'
import { delToken, getToken } from './oauth'
import { validateURL } from './validate'
import router from '../router'

// 测试环境，生产需删除这个和下面的request内部有关test的内容
let test = !global === undefined

const apiOutTime = api.timeout
const apiCors = api.cors
function isEmptyObj (obj) {
  return obj === undefined || obj === null || obj === {}? true: false
}
function toForm (obj) {
  if (typeof obj === 'string') {
    return obj
  } else {
    return obj2UrlForm(obj)
  }
}
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let errorMsg = '网页错误，请稍后再试！'
    if (response.status === 404) {
      errorMsg = '资源不存在！'
    }
    if (response.status === 403) {
      errorMsg = '无权访问！'
    }
    if (response.status >= 500) {
      errorMsg = '服务器错误！'
    }
    const error = new Error(errorMsg)
    error.response = response
    throw error
  }
}

function calaulatorSign (data) {
  let today = global.fecha.format(new Date(), 'YYYY-MM-DD')
  if (isEmptyObj(data)) {
    return md5(global.MD5_PREFIX + '{}' + today)
  } else {
    return md5(global.MD5_PREFIX + JSON.stringify(data) + today)
  }
}

// dataType暂时只支持json和form传输数据，默认为form
function setParams (params, method, token, data) {
  let obj = {
    method: method,
    headers: {}
  }
  // 带Token
  if (params.oauth === undefined || params.oauth) {
    obj.mode = 'cors'
    obj.headers.epToken = token
    obj.headers.epSign = calaulatorSign(data)
  }
  // 带body
  let body
  switch (params.dataType) {
    case 'json':
      body = !isEmptyObj(params) ? JSON.stringify(data) : undefined
      obj.headers['Content-type'] = 'application/json'
      break
    case 'form':
      body = !isEmptyObj(params) ? toForm(data) : undefined
      obj.headers['Content-type'] = 'application/x-www-form-urlencoded'
      break
    default:
      body = !isEmptyObj(params) ? JSON.stringify(data) : undefined
      obj.headers['Content-type'] = 'application/json'
      break
  }
  if (method === 'POST') {
    obj.body = body
  }
  return obj
}

// 跨域，拼接global内的域名
function urlMerge (settings) {
  let url = settings.url
  if (validateURL(url)) {
    return url
  }
  let canMerge = apiCors
  if (settings.cors) {
    canMerge = true
  }
  return canMerge ? global.HOST + url : url
}
function timeout (time) {
  return new Promise((resolve, reject) => {
    let t1 = setTimeout(() => {
      clearTimeout(t1)
      reject(new Error('请求超时！'))
    }, time * 1000)
  })
}
function request (url, settings) {
  return new Promise((resolve, reject) => {
    fetch(url, settings)
    // fetch(url)
      .then(checkStatus)
      .then(res => { return res.json() })
      .then((json) => {
        if (dataErr(json)) {
          resolve(json)
        } else {
          // 重新登录
          if (json.errorCode === '904') {
            delToken()
            router.push('/login')
            Message({
              type: 'danger',
              message: '授权失效，请重新登录',
              hasClose: true
            })
          }
          throw new Error(json.errorInfo)
        }
      }).catch(reject)
  })
}
function _fetch (url, settings) {
  return Promise.race([ timeout(apiOutTime), request(url, settings) ])
}

/***
 * post方法
 * @key      对于Api的哪一个
 * @params   参数obj（可不传）
 * @showMess 是否显示Message（可不传，默认显示）
 */
export function post (key, params, showMess) {
  return new Promise((resolve, reject) => {
    const ajaxParam = api.post[key]
    if (ajaxParam === undefined) {
      reject(key + ' in POST object is undefined in Api.json')
    }
    const token = getToken()
    if (token !== '' || !ajaxParam.oauth) {
      if (!ajaxParam.url) {
        reject('Api Must has URL')
      } else {
        const settings = setParams(ajaxParam, 'POST', token, params)
        let url = urlMerge(ajaxParam)
        
        _fetch(url, settings)
          .then(json => {
            if (showMess === false) {
              Message({
                type: 'success',
                message: '成功',
                hasClose: true
              })
            }
            resolve(json)
          })
          .catch(e => {
            reject(e)
            Message({
              type: 'danger',
              message: e.message,
              hasClose: true
            })
          })
      }
    } else {
      // 无令牌，需要登陆
      router.push('/login')
      reject('')
    }
  })
}

/***
 * @number   第几个
 * @params   参数obj
 * @showMess 是否显示Message（可不传，默认显示）
 */
export function get (key, params, showMess) {
  return new Promise((resolve, reject) => {
    const ajaxParam = api.get[key]
    if (ajaxParam === undefined) {
      reject(key + ' in GET object is undefined in Api.json')
    }
    const token = getToken()

    if (token !== '' || !ajaxParam.oauth) {
      if (!ajaxParam.url) {
        reject('Api Must has URL')
      } else {
        const settings = setParams(ajaxParam, 'GET', token, undefined)
        let url = urlMerge(ajaxParam)
        if (!isEmptyObj(params)) {
          url += '?' + obj2UrlForm(params)
        }

        _fetch(url, settings)
          .then(json => {
            if (showMess === true) {
              Message({
                type: 'success',
                message: '成功',
                hasClose: true
              })
            }
            resolve(json)
          })
          .catch(e => {
            reject(e)
            Message({
              type: 'danger',
              message: e.message,
              hasClose: true
            })
          })
      }
    } else {
      // 无令牌，需要登陆
      router.push('/login')
      reject('无权访问！')
    }
  })
}

/***
 * Jsonp操作类
 * @number 第几个
 * @fn     成功回调
 * @params 参数obj（可不传）
 * @err    错误函数（可不传）
 */
export function jsonp (number, fn, params, err) {
  let url = api.jsonp[number]
  if (!isEmptyObj(params)) {
    url += '?' + obj2UrlForm(params)
  }

  fetchJsonp(url)
  .then((response) => {
    return response.json()
  }).then((json) => {
    if (fn) { fn.call(this, json) }
  }).catch((e) => {
    console.log(e)
    if (err) { err.call(this, e) }
  })
}
