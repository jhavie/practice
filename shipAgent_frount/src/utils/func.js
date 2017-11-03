/**
 * 微信
 */
export function is_weixn(){  
  let ua = navigator.userAgent.toLowerCase()
  if(ua.indexOf('micromessenger') > 0) {
      return true
  } else {
      return false  
  }
}

export function getScript (src, obj, callback) {
  if (!global[obj]) {
    const $script = document.createElement('script')
    document.body.appendChild($script)
    $script.src = src
    $script.onload = function () {
      callback()
    }
  } else {
    callback()
  }
}

export function isArray (v) {
  return v instanceof Array
}
