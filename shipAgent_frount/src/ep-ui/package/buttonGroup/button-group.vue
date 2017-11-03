<template>
  <div class="ep-button-group">
    <slot></slot>
  </div>
</template>
<script>
  import emitter from './../../src/mixins/emitter';
  /**
   * button
   * @module components/basic/menu
   * @desc 用于按钮组
   * @param {string} label - 名称
   * CSS 在button.css中
   */
  export default {
    name: 'ep-button-group',

    mixins: [emitter],

    data () {
      return {

      }
    },

    props: {
      value: [Array]
    }
  }
</script>