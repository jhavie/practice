/**
 * Material Design水波动画
 * User: merjiezo
 * Date: 2017/5/20
 * Time: 上午9:35
 */
import { on, addClass, setStyle, removeClass, hasClass } from "./dom"

const time = 1000
const hasTouch = 'ontouchstart' in document;
const getEventName = (type) => {
  if (type === 'start') {
    return hasTouch ? 'touchstart' : 'mousedown';
  }
  return hasTouch ? 'touchend' : 'mouseup';
}
const getClickPosition = (evt, circle) => {
  let X, Y
  X = evt.layerX > 0? evt.layerX: evt.offsetX
  Y = evt.layerY > 0? evt.layerY: evt.offsetY
  
  return {
    top: Y - circle / 2 + 'px',
    left: X - circle / 2 + 'px'
  }
}

const template = (rippleColor) => {
  let inner = document.createElement('div')
  inner.className += `ep-ripple ep-ripple-${rippleColor}`
  let HTML = document.createElement('div')
  HTML.className += 'ep-ink-ripple'
  HTML.appendChild(inner)

  return HTML
}

function insertHTML (el, temp) {
  el.appendChild(temp)
  return el.querySelector('.ep-ink-ripple')
}

function Wave (el, set) {
  let settings = {
    disabled: false,
    color: 'white'
  }
  if (set) {
    settings = set
  }
  if (!settings.disabled === true) {

    this.el = insertHTML(el, template(settings.color))
    this.ripple = this.el.querySelector('.ep-ripple')
    this.awitTime = null

    this.init()
  }
}

Wave.prototype = {

  init () {
    on (this.el.parentNode, getEventName('start'), this.start.bind(this))
  },

  start (evt) {
    if (hasClass(this.ripple, 'ep-ripple-active')) {
      clearTimeout(this.awitTime)
      this.awitTime = null
      this.remove()
    }
    let el = this.el
    let circle = el.offsetWidth > el.offsetHeight? el.offsetWidth: el.offsetHeight
    const position = getClickPosition(evt, circle)
    let style = {
      top: position.top,
      left: position.left,
      width: circle + 'px',
      height: circle + 'px'
    }
    setStyle(this.ripple, style)
    addClass(this.ripple, 'ep-ripple-active')

    this.awitTime = setTimeout(() => {
      this.remove()
    }, time)
  },

  remove () {
    removeClass(this.ripple, 'ep-ripple-active')
    this.ripple.removeAttribute('style')
  }
}

export default Wave