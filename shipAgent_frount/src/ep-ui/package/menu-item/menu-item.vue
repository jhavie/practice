<template>
  <li class="ep-menu-item"
    :class="{ 'is-active': isActive }"
    @click="handleClick">
    <a v-wave="{ color: waveColor }" v-if="!currentRouter || !link"
      :href="link? link: 'javascript:void(0)'" :style="{ paddingLeft: paddingLeft }">
      <i v-if="icon" class="ep-menu-item-icon" :class="'ion-' + icon"></i>
      <span class="ep-menu-item-narrow-span">
        <slot></slot>
      </span>
    </a>
    <router-link v-if="currentRouter && link" :to="link" :style="{ paddingLeft: paddingLeft }">
      <i v-if="icon" class="ep-menu-item-icon" :class="'ion-' + icon"></i>
      <span class="ep-menu-item-narrow-span">
        <slot></slot>
      </span>
    </router-link>
  </li>
</template>

<script>
  import emitter from './../../src/mixins/emitter';

  export default {

    mixins: [emitter],

    name: 'ep-menu-item',

    props: {
      icon: String,
      link: String,
      index: [String, Number],
      isRouter: {
        type: Boolean,
        default: undefined
      }
    },

    data () {
      return {
        hasSubmenu: this.$parent.$options._componentTag === 'ep-submenu'
      }
    },

    computed: {
      waveColor () {
        if (this.menu.theme === 'light') {
          return 'dark'
        } else {
          return 'white'
        }
      },
      isNarrow () {
        return this.menu.narrow
      },
      paddingLeft () {
        if (this.parentSub !== null) {
          let level = this.parentSub.level
          level += 1
          return level * 15 + 'px'
        }
        return null;
      },
      parentSub () {
        let submenu = null;
        let parent = this.$parent;
        while (parent.$options._componentTag !== 'ep-menu') {
          if (parent.$options._componentTag === 'ep-submenu') {
            submenu = parent;
            break;
          }
          parent = parent.$parent;
        }
        return submenu;
      },
      menu () {
        let parent = this.$parent;
        while (parent.$options._componentTag !== 'ep-menu') {
          parent = parent.$parent;
        }
        return parent;
      },
      currentRouter () {
        let res;
        if (this.isRouter !== undefined) {
          res = this.isRouter
        } else {
          res = this.menu.isRouter || false
        }
        return res
      },
      isActive () {
        return this.index === this.menu.activeIndex
      }
    },

    methods: {
      handleClick (evt) {
        if (this.menu.isHorizontal) {
          this.dispatch('ep-submenu', 'ep.submenu.closeSubmenu')
        }
        this.dispatch('ep-menu', 'ep.menu.handleIndex', this)
        this.$emit('click', evt)
      }
    },
    mounted () {
      if (this.parentSub !== null) {
        this.parentSub.addMenuItem(this.index)
      }
    },
    beforeDestory () {
      if (this.parentSub !== null) {
        this.parentSub.deleteMenuItem(this.index)
      }
    }
  }
</script>