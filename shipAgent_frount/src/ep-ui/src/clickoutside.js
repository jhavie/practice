import Vue from 'vue';
import { on } from './utils/dom';

const nodeList = [];
const ctx = '@@clickoutsideContext';

!Vue.prototype.$isServer && on(document, 'click', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e));
});
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="handleClickoutside">
 * ```
 */
export default {
  bind(ep, binding, vnode) {
    const id = nodeList.push(ep) - 1;
    const documentHandler = function(e) {
      if (!vnode.context ||
        ep.contains(e.target) ||
        (vnode.context.popperElm &&
        vnode.context.popperElm.contains(e.target))) return;

      if (binding.expression &&
        ep[ctx].methodName &&
        vnode.context[ep[ctx].methodName]) {
        vnode.context[ep[ctx].methodName]();
      } else {
        ep[ctx].bindingFn && ep[ctx].bindingFn();
      }
    };
    ep[ctx] = {
      id,
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },

  update(ep, binding) {
    ep[ctx].methodName = binding.expression;
    ep[ctx].bindingFn = binding.value;
  },

  unbind(ep) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === ep[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
  }
};