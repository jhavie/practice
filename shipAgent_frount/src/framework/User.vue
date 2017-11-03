<template>
  <div>
    <header>
      <div class="panel-menu-padding panel-blue">
        <ep-menu 
          is-horizontal no-back :has-line="false">
          <li class="ep-menu-item">
            <a href="javascript:void(0)" @click="tiaozhuan">舱单审核</a>
          </li>
        </ep-menu>
      </div>
    </header>
    <main class="panel-main" style="padding-top: 20px">
      <div style="max-width: 1200px; margin: auto">
        <router-view></router-view>
      </div>
    </main>
    <!-- 版权信息 -->
    <footer class="panel-copyright">
      <p>
        Copyright (C) 2001-2017 easipass.com. All Rights Reserved Version: 2.0.0.0
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'User',

    methods: {
      tiaozhuan () {
        this.$router.replace('/search')
      }
    }
  }

</script>

<style>

</style>
