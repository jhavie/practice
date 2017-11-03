<template>
  <div class="panel-menu-padding">
    <ep-menu 
      is-horizontal no-back :has-line="false">
      <li class="ep-menu-item">
        <a href="javascript:void(0)" @click="tiaozhuan">舱单审核</a>
      </li>
      <li class="ep-menu-item">
        <div class="menu-item-input">
          <input type="text" placeholder="搜索"
            @focus="onFocus" @keyup.enter="search"
            :style="{ width: widthInput + 'px' }">
          <button class="search-btn" @click="search">
            <i class="ion-search"></i>
          </button>
        </div>
      </li>
      <div class="panel-menu-right">
        <ep-menu-item icon="android-settings" is-router link="personal" index="1"></ep-menu-item>
        <ep-menu-item icon="power" index="2" @click="handleLogout"></ep-menu-item>
        <ep-menu-item icon="tshirt" index="3" @click="$emit('change-skin')"></ep-menu-item>
      </div>
    </ep-menu>
    <ep-tabs position="middle" theme="primary" :active="active" @change="handleChange">
      <ep-tab-item name="首页" icon="android-globe"></ep-tab-item>
      <ep-tab-item name="审单" icon="android-settings"></ep-tab-item>
      <!-- <ep-tab-item name="录入" icon="clipboard"></ep-tab-item> -->
    </ep-tabs>
  </div>
</template>

<script>
  import { logout } from 'utils'
  const maxInput = 200
  const originInput = 110

  export default {
    name: 'frame-menu',

    data () {
      return {
        sign: false,
        active: this.$route.name,
        widthInput: originInput
      }
    },

    watch: {
      '$route' (to, from) {
        if (to.path === '/review'
          && (to.query.status || to.query.billNo)) {
          this.sign = true
          this.$el.querySelectorAll('.ep-tabs-item').forEach((item) => {
            if (item.innerText.tirm() === '审单') {
              item.click()
            }
          })
        }
        // if (to.query.billNo && to.path === '/input') {
        //   this.sign = true
        //   this.$el.querySelectorAll('.ep-tabs-item').forEach((item) => {
        //     if (item.innerText.tirm() === '录入') {
        //       item.click()
        //     }
        //   })
        // }
      }
    },

    methods: {
      handleChange (item) {
        if (this.sign) {
          this.sign = false
          return
        }
        if (item === '首页') {
          this.$router.push('home')
        } else if (item === '录入') {
          this.$router.push('input')
        } else if (item === '审单') {
          this.$router.push('review')
        }
      },
      changeWidth () {
        const temp = this.$store.getters.getChangeWidth
        if (temp === 0) {
          this.$store.dispatch('setChangeWidth', 1)
        } else {
          this.$store.dispatch('setChangeWidth', 0)
        }
      },
      onFocus () {
        this.widthInput = maxInput
      },
      search () {
        this.widthInput = originInput
        //TODO Search
      },
      handleLogout () { logout() },
      tiaozhuan () {
        this.$router.replace('/search')
      }
    }
  }
</script>

<style>
  .menu-item-input {
    padding-left: 20px;
    position: relative;
    line-height: 48px;
  }
  .menu-item-input > input {
    will-change: width;
    box-sizing: border-box;
    outline: none;
    border: none;
    padding: 5px 35px 5px 15px;
    height: 30px;
    border-radius: 18px;
    background-color: #FFF;
    -webkit-transition: width .5s;
    transition: width .5s;
  }
  .search-btn {
    cursor: pointer;
    outline: none;
    position: absolute;
    top: 12px;
    right: 2px;
    width: 26px;
    height: 26px;
    border: none;
    padding: 0;
    border-radius: 50%;
    color: #FFF;
    background-color: #AAA;
    text-align: center;
    line-height: 26px;
  }
  .search-btn > i {
    display: inline-block;
    width: 100%
  }
  .ep-tabs-default .ep-tabs-ink, .ep-tabs-primary .ep-tabs-title {
    background: transparent
  }
</style>