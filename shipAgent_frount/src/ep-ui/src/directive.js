import Vue from "vue";
import Wave from "./utils/wave";
import { on, off } from "./utils/dom";
const hasTouch = 'ontouchstart' in document;

/**
 * Wave水波指令
 */
Vue.directive('wave', {
  inserted (el, binding) {
    new Wave(el, binding.value)
  }
})

//TODO
function bind (el, position, fn) {
  on (el, 'touchend')
}

/**
 * 保证组件内部只有一个input元素
 */
Vue.directive('focus', {
  inserted (el) {
    el.querySelector('input').focus()
  }
})
/**
 * 手机点击事件
 */
Vue.directive('tap', {
  inserted (el, binding) {
    if (hasTouch) {
      if (typeof binging.value === 'Function') {
        on (el, 'click', (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
        })
        on (el, 'touchstart', bind)
      }
      
    }

  }
})