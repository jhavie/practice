<template>
  <div id="app">
    <transition name="fade-opacity" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import throttle from "throttle-debounce/throttle"
  import { on, off } from "./utils/dom"

	export default {
		name: 'app',

    created () {
      document.title = global.title + this.$route.name
    },

    mounted () {
      let vm = this
      // this.changeSize = throttle(300, (evt) => {
      //   const width = vm.$store.getters.getChangeWidth
      //   if (evt.currentTarget.innerWidth <= 768 && width === 0) {
      //     vm.$store.dispatch('setChangeWidth', 1)
      //   }
      //   if (evt.currentTarget.innerWidth > 768 && width === 1) {
      //     vm.$store.dispatch('setChangeWidth', 0)
      //   }
      // })
      // on (window, 'resize', this.changeSize)
    },

		watch: {
      '$route' (to, from) {
        //监听路由改变
        document.title = global.title + to.name
      }
    },

    destroyed () {
      // off (window, 'resize', this.changeSize)
    }
	}
</script>

<style>
  @import "../node_modules/ionicons-npm/css/ionicons.min.css";
  @import "./assets/css/epui.min.css";
  @import "./assets/css/main.css";
  @import "./assets/css/panel.min.css";
  .pull-left {
  float: left
  }
  .pull-right {
    float:right
  }
  .ep-validate-error .el-input__inner {
    border-color: red;
  }
</style>