/**
 * Date 操作类
 * @author: Merjiezo
 * @since: 2016-8-1
 */

/**
 * 获取
 * 1、当前月有多少天
 * 2、最后一天为星期几
 */
function getEndInfo (year, month) {
  let res = new Date(year, month, 0)
  return [ res.getDate(), res.getDay() ]
}

/**
 * 获取这个月开始时为星期几
 */
function getStartDate (year, month) {
  let res = new Date(year, month - 1, 1)
  return res.getDay()
}

const newArray = function(start, end, month) {
  let res = []

  for (let i = start; i <= end; i++) {
    res.push({
      month: month,
      date: i
    })
  }
  return res
}

const newArrayEmpty = function(start, end, month) {
  let res = []

  for (let i = start; i <= end; i++) {
    res.push({
      isEmpty: true,
      month: month,
      date: i
    })
  }
  return res
}

export const getNow = function () {
  let date = new Date()
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
}

export const equalDate = function(dateA, dateB) {
  return 
    dateA === dateB 
      || new Date(dateA).getTime() === new Date(dateB).getTime()
}

export const isDate = function(date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  return true
}

export const toDate = function(date) {
  return isDate(date) ? new Date(date) : null
}

function clone (d) {
  return new Date(d.getTime())
}

export const getWeeks = function () {
  return [ '日', '一', '二', '三', '四', '五', '六' ]
}

export const getMonth = function () {
  return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
}

export const getYear = function (time) {
  let start = new Date()
  if (time === undefined || time === null) {
    start = start.getFullYear()
  } else {
    start = time
  }
  start = start - start % 10
  
  return newArray (start, start + 9)
}

export const getDate = function (year, month) {
  let exMon      = [],
      nowMon     = [],
      nextMon    = [],
      date       = getStartDate(year, month),
      endDayArr  = getEndInfo(year, month),
      endMonStat = endDayArr[1],
      exYear, exMonth, exStat, exEnd, 
      nextEnd

  
  if (date !== 0) {
    if (month === 1) {
      exYear = year - 1
      exMonth  = 12
    } else {
      exYear = year
      exMonth  = month - 1
    }

    exEnd = getEndInfo(exYear, exMonth)[0]
    exStat = exEnd - date + 1
  }

  exMon   = newArrayEmpty(exStat, exEnd, exMonth)
  nowMon  = newArray(1, endDayArr[0], month)
  nextEnd = 6 - endMonStat
  if (nextEnd !== 0) {
    let nextMonth = month + 1 === 13? 1: month + 1
    nextMon = newArrayEmpty(1, nextEnd, nextMonth)
  }

  return exMon.concat(nowMon, nextMon)
}