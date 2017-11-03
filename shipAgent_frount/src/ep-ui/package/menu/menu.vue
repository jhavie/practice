<template>
  <ul class="ep-menu" :class="mainClass">
    <slot></slot>
  </ul>
</template>

<script>
  import emitter from './../../src/mixins/emitter';

  export default {

    name: 'ep-menu',

    created () {
      this.$on('ep.menu.handleIndex', this.handleIndex)
    },

    props: {
      narrow: Boolean,
      noBack: Boolean,
      hasLine: {
        type: Boolean,
        default: true
      },
      isHorizontal: Boolean,
      theme: {
        type: String,
        default: 'blue'
      },
      isRouter: Boolean,
      defaultIndex: [String, Number]
    },

    data () {
      return {
        activeIndex: this.defaultIndex ? this.defaultIndex: null
      }
    },

    computed: {
      mainClass () {
        let result = [];
        if (this.isHorizontal) {
          result.push('ep-menu-horizontal')
        } else {
          result.push('ep-menu-vertical')
        }
        result.push('ep-menu-' + this.theme)
        if (this.noBack) {
          result.push('ep-menu-no-back')
        }
        if (!this.hasLine) {
          result.push('ep-menu-no-border')
        }
        if (this.narrow) {
          result.push('ep-menu-narrow')
        }
        return result
      }
    },

    methods: {
      handleIndex (vm) {
        const child = vm.$slots.default
        let name = null
        if (child !== undefined && child.length > 0
          && child[0].tag === undefined) {
          name = child[0].text
        }
        this.activeIndex = vm.index
        this.$emit('change', vm.index, {
          link: vm.link,
          icon: vm.icon,
          isRouter: vm.isRouter,
          name: name
        })
      }
    }
  }
</script>