<template>
	<div class="menu-shadow-left panel-left" style="background-color: #FAFAFA"
    :style="{ width: stateWidth }">
    <div class="shwdow-top panel-personal" :class="'panel-' + $parent.theme" :style="{ backgroundImage: 'url(' + imgs[$parent.theme] + ')' }" v-if="changeWidth === 0">
      <div class="card-shadow panel-personal-icon" style="z-index: 300">
        <img src="../../assets/users/avatar-6.png" alt="user">
      </div>
      <h3 style="z-index: 400">EASIPASS</h3>
    </div>
    <div class="panel-personal panel-personal-minwidth" :class="'panel-' + $parent.theme" v-else>
      <h3>EP</h3>
    </div>
    <div class="panel-personal-content" :style="{ top: isNarrow? '60px': null }">
      <div class="panel-nav">
        <ep-menu is-router no-back
          :narrow="isNarrow"
          @change="handleSelect"
          class="ep-menu-demo-vertical" theme="light">
          <template v-for="menu in this.$store.getters.getRouterJson">
            <template v-if="menu.children !== undefined && menu.children.length > 0">
              <ep-submenu :icon="menu.icon" :title="menu.name" :key="menu.name">
                <template v-for="child in menu.children">
                  <ep-menu-item :index="child.index" :key="child.name" :icon="child.icon" :link="child.router">{{ child.name }}</ep-menu-item>
                </template>
              </ep-submenu>
            </template>
            <template v-else>
              <ep-menu-item :index="menu.index"  :key="menu.name" :icon="menu.icon" :link="menu.router">{{ menu.name }}</ep-menu-item>
            </template>
          </template>
        </ep-menu>
        <p class="no-data reload-menu" v-if="this.$store.getters.getRouterJson.length === 0">Menu加载中...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import dark from '../../assets/frame/home-dark.png'
  import blue from '../../assets/frame/home-blue.png'
  import darkBlue from  '../../assets/frame/home-dark-blue.png'
  import green from  '../../assets/frame/home-green.png'
  import pupple from  '../../assets/frame/home-pupple.png'
  import orange from  '../../assets/frame/home-orange.png'

  export default {
    name: 'left-menu',

    props: {
      changeWidth: Number
    },

    computed: {
      stateWidth () {
        return this.$parent.paddingLeft
      },
      isNarrow () {
        if (this.$store.getters.getChangeWidth === 1) {
          return true
        } else {
          return false
        }
      }
    },

    data () {
      return {
        menus: [],
        imgs: {
          dark: dark,
          blue: blue,
          'dark-blue': darkBlue,
          green: green,
          pupple: pupple,
          orange: orange
        }
      }
    },

    methods: {
      handleSelect(index, menu) {
        this.$emit('change', menu)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  .panel-personal {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%
  }
  .panel-personal-content {
    position: absolute;
    top: 200px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-transition: top .3s;
    transition: top .3s
  }
  .reload-menu {
    cursor: pointer;
    font-size: 12px;
  }
  .reload-menu:hover {
    background: #EEE;
  }
</style>