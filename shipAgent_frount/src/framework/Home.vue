<template>
  <div>
    <!-- 头部 -->
    <header class="shadow-top panel-menu" :class="'panel-' + theme"
      :style="{ paddingLeft: paddingLeft }">
      <frame-menu @change-skin="toggleSkin"></frame-menu>
    </header>
    <!-- 业务框架 -->
    <main class="panel-main" 
      :style="{ paddingLeft: paddingLeft }">
      <transition name="fade-opacity" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- 版权信息 -->
      <footer class="panel-copyright">
        <p>
          Copyright (C) 2001-2017 easipass.com. All Rights Reserved Version: 2.0.0.0
        </p>
      </footer>
      <return-top :theme="theme"></return-top>
    </main>
    <change-skin v-model="showRight"></change-skin>
  </div>
</template>

<script>
import frameMenu from "./components/frame-menu"
import epTab from "./components/ep-tab"
import leftMenu from "./components/left-menu"
import changeSkin from "./components/change-skin"
import returnTop from "./components/return-top"
import { post } from "utils/fetch"
import { getPermission } from 'utils/oauth'
import CanvasParticle from 'lib/canvas-particle'

function getMenusIndex (menus, path) {
  for (let i = 0, j = menus.length; i < j; i++) {
    let temp = menus[i].path.startWith('/')? menus[i].path.substring(1): menus[i].path
    let comparePath = path.startWith('/')? path.substring(1): path
    
    if (temp === comparePath) {
      return i
    }
  }
  return -1
}

export default {
  name: 'main',

  components: {
    frameMenu, epTab, leftMenu, changeSkin, returnTop
  },

  data () {
    return {
      height: document.body.offsetHeight,
      includeModule: 'home',
      activeIndex: 0,
      showRight: false
    }
  },

  computed: {
    paddingLeft () {
      if (this.$store.getters.getChangeWidth === 1) {
        return '60px'
      } else {
        return null
      }
    },
    theme () {
      return this.$store.getters.getTheme
    }
  },

  methods: {
    toggleSkin () {
      this.showRight = !this.showRight
    },
    //Tab变化时
    handleChange (index, tab) {
      this.$router.push(tab.path)
    },
    getNewTabItem (menu) {
      let newItem = {
        name: menu.name,
        path: menu.link,
        icon: null
      }
      if (menu.hasOwnProperty('icon')) {
        newItem.icon = menu.icon
      }
      return newItem
    },
    handleMenuChange (menu) {
      let menus = this.$store.getters.getMenuTabs

      this.$nextTick(() => {
        const path = menu.link
        const count = getMenusIndex(menus, path)
        //定位到该Tab
        if (count !== -1) {
          this.activeIndex = count
        } else {
          //新增Tab
          if (menu.name !== '404 Not Found!' || menu.name !== '401 No Permission!') {
            this.includeModule += ',' + menu.link.split(1)
            menus.push(this.getNewTabItem(menu))
            this.$store.dispatch('changeMenuTabs', menus)
            this.addTab(menus.length)
          }
        }
      })
    },
    //Tab关闭时
    handleClose (index, closedTab) {
      const closePath = closedTab.path.split(1)
      let modules = this.includeModule
      modules.replaceAll(',' + closePath, '')
      this.includeModule = modules
      // console.log(closedTab)
    },
    addTab (index) {
      this.activeIndex = index - 1
      this.$refs.frameTab.addProp()
    }
  }

}
</script>

<style>
  .menu-shadow-left {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
      0 3px 7px -2px rgba(0, 0, 0, 0.4), 
      0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .shadow-right {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .shadow-top {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 
      0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
  .shadow-bottom {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)
  }
</style>