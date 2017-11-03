<template>
  <li :class="mainClass">
    <div href="javascript:void(0)" class="ep-submenu-title">
      <i v-if="icon" :class="'ion-' + icon" :style="{ paddingRight: title && !menu.narrow? '7px': '' }"></i>
      <template v-if="!menu.narrow">
        {{ title }}
        <i class="ep-menu-drop ion-chevron-down"></i>
      </template>
    </div>
    <transition v-if="isHorizontal" name="ep-submenu-horfade">
      <div class="ep-submenu" v-show="showSubmenu">
        <ul>
          <slot></slot>
        </ul>
      </div>
    </transition>
    <transition 
      v-else
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave">
        <ul v-show="showSubmenu">
          <slot></slot>
        </ul>
    </transition>
  </li>
</template>

<script>
  import { on, off } from "../../src/utils/dom";
  import MenuTransition from "../../src/mixins/menu-transition";

  export default {

    name: 'ep-submenu',

    mixins: [ MenuTransition ],

    props: {
      icon: String,
      title: {
        type: String,
        require: true
      }
    },

    data () {
      return {
        showSubmenu: false,
        menuItems: []
      }
    },

    computed: {
      mainClass () {
        let res = [];
        if (this.isHorizontal) {
          res.push('ep-menu-item')
        } else {
          res.push('ep-submenu')
        }
        if (this.isActive) {
          res.push('is-active')
        }
        if (this.showSubmenu) {
          res.push('is-open')
        }
        return res;
      },
      menu () {
        let parent = this.$parent
        while (parent.$options.name !== 'ep-menu') {
          parent = parent.$parent
        }
        return parent;
      },
      level () {
        let level = 1
        let parent = this.$parent
        while (parent.$options.name !== 'ep-menu') {
          if (parent.$options.name === 'ep-submenu') {
            level += 1
          }
          parent = parent.$parent
        }
        return level
      },
      isHorizontal () {
        return this.menu.isHorizontal
      },
      isActive () {
        const actionIndex = this.menu.activeIndex
        const menuItems = this.menuItems;
        let res = false
        menuItems.every((item) => {
          if (item === actionIndex) {
            res = true
            return false
          }
          return true
        })
        return res
      }
    },

    methods: {
      handleHorizontalEvent (evt) {
        if (evt.type === 'mouseenter') {
          this.showSubmenu = true
        } else {
          this.showSubmenu = false
        }        
      },
      handleClick (evt) {
        this.showSubmenu = !this.showSubmenu
      },
      //初始化事件，垂直为click，水平为hover
      initEvent () {
        if (this.isHorizontal) {
          on(this.$el, 'mouseenter', this.handleHorizontalEvent)
          on(this.$el, 'mouseleave', this.handleHorizontalEvent)
        } else {
          let $el = this.$el.querySelector('.ep-submenu-title')
          on($el, 'click', this.handleClick)
        }
      },
      addMenuItem (index) {
        if (index) {
          this.menuItems.push(index)
        } else {
          throw new Error('When ep-menu have ep-submenu, ep-menu-item must have property Index!')
        }
      },
      deleteMenuItem (index) {
        this.menuItems.every((item, i) => {
          if (item === index) {
            this.menuItems.splice(i, 1)
            return false
          }
          return true
        })
      },
      closeSubmenu () {
        this.showSubmenu = false
      }
    },
    mounted () {
      let vm = this
      this.$on('ep.submenu.closeSubmenu', this.closeSubmenu)
      this.initEvent()
    }
  }
</script>