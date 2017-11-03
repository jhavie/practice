/**
 * Created by merjiezo on 17/05/10.
 */
import { isEmpty } from './data'

 /* 小写字母*/
export function validatePhone(str) {
  const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  return reg.test(str);
}

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@easipass\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 登陆注册验证
 * @param {*回调} callback 
 * @param {*验证表单} form 
 */
export function validateLoginSign (callback, form) {
  for (let item in form) {
    if (isEmpty(form[item])) {
      callback.call(this, false, '参数项不能为空')
      return
    }
  }
  if (!validatePhone(form.id)) {
    callback.call(this, false, '手机号不正确')
    return
  }
  callback.call(this, true)
}

/**
 * 验空
 * @param {*回调} callback 
 * @param {*验证表单} form 
 * @param {*不验证list} noneList 形如*|*|*
 */
export function validateInput (callback, form, noneList) {
  if (undefined === noneList) {
    for (let item in form) {
      if (isEmpty(form[item])) {
        callback.call(this, false, '参数项不能为空')
        return
      }
    }
  } else {
    for (let item in form) {
      if (noneList.indexOf(item) === -1  && isEmpty(form[item])) {
        callback.call(this, false, '参数项不能为空')
        return
      }
    }
  }
  callback.call(this, true)
}
