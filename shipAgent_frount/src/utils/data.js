/**
 * 整理table对外暴露的内容为全新的数据
 * @param {*table对外暴露的内容} obj 
 */
export const getTabRow = function (obj) {
  let res = cloneObj(obj)
  delete (res.$nChg)
  delete (res.$type)
  delete (res.rowEdit)
  delete (res.rowHover)
  return res
}

/**
 * 对象变fetch的form类型传参
 */
export const obj2UrlForm = function (object) {
  let result = ''
  for (var item in object) {
    if (object.hasOwnProperty(item)) {
      result += `${item}=${object[item]}&`
    }
  }
  return result.substr(0, result.length - 1)
}

/**
 * 接口错误方法
 * 可跟根据接口模式覆盖
 * @param {*接口obj} object
 */
export const dataErr = function (object) {
  // return object.flag === "T"
  if (object.flag) {
    return object.flag === 'T'
  }
  // 兼容之前的接口
  if (object.code) {
    return object.code === '1'
  }
}

/**
 * 
 * @param {*} filterVal
 * @param {*} jsonData
 */
export const formatJson = function (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

/**
 * 深拷贝对象或数组
 * @param {*要拷贝的Object或者Array} obj
 */
export function cloneObj (obj) {
  let str, newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if(window.JSON) {
    str = JSON.stringify(obj)
    newobj = JSON.parse(str)
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object'
        ? cloneObj(obj[i])
        : obj[i]
    }
  }
  return newobj
}

/**
 * 为object添加属性
 * @param {*待添加的data} data
 * @param {*需要添加的属性} props
 */
export function addProps (data, props) {
  let length = data.length
  for (let i = 0; i < length; i++) {
    for (let key in props) {
      data[i][key] = props[key]
    }
  }
}

/**
 * 合并object
 * @param {*目标对象} target
 * @param {*合并的对象} source
 */
export function merge (target, source) {
  let res = { ...target }
	for (var key in source) {
		res[key] = source[key]
	}
  return res
}

/**
 * Object是否为空
 * @param {*对象} object
 */
export function objIsEmpty (object) {
  return object === undefined ||
         object === null ||
         JSON.stringify(object) === '{}'
}

/**
 * 是否为空
 * @param {*参数项} item 
 */
export function isEmpty (item) {
  return item === undefined || item === null || item === ''
}

/**
 * 格式化小数位
 * @param {*待处理小数} src 
 * @param {*保留几位} pos 
 */
export function fomatFloat (src, pos) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos)
}
