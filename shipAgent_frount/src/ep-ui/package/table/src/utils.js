/**
 * Table 工具方法
 * @author: Merjiezo
 * @since: 2016-06-18
 */
let now = 0;

export function getCell () {
  
}

export function setCell () {

}

export function getTbNext () {
  return now += 1
}

export function cloneObj (obj) {
  let str, newobj = obj.constructor === Array ? [] : {};
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

export function cloneObjExcept (obj, keyWord) {
  let keyArr = keyWord.split('|'),
      res    = { ...obj }
  if (res !== {}) {
    keyArr.forEach((element) => {
      if (res.hasOwnProperty(element)) {
        delete res[element]
      }
    })
  }
  return res
}

export function addProps (data, props) {
  let length = data.length
  for (let i = 0; i < length; i++) {
    for (let key in props) {
      Object.defineProperty(data[i], key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: props[key]
      })
    }
  }
}

export function merge (target, source) {
  let res = { ...target }
	for (var key in source) {
		res[key] = source[key];
	}
  return res
}

export function getWidth ($width, columns) {
  let width      = 0,
      hasNoWidth = false

  for (let i = 0; i < columns.length; i++) {
    if (undefined !== columns[i].width) {
      width += columns[i].width
    } else {
      hasNoWidth = true
      width += columns[i].minWidth
    }
  }
  if ($width < width || hasNoWidth === false) {
    return width
  }
}