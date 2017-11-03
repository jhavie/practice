export default {

  setCookie (key, value, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 60 * 24 * 60 * 1000))
    let expires = "expires=" + d.toGMTString()
    document.cookie = key + '=' + value + '; ' + expires
  },

  getCookie (name) {
    let cname = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      if (c.indexOf(cname) == 0)
        return c.substring(cname.length, c.length)
    }
    return ''
  },

  delCookie (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let val = this.getCookie(name)
    if (val != null)
      document.cookie = name + '=' + val + ';expires=' + exp.toGMTString()
  }

}
