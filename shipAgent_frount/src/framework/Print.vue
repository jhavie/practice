<template>
  <div>
    <br/>
    <div class="print">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .print {
    padding: 48px;
    width: 920px;
    height: auto;
    max-height: 1200px;
    margin: auto;
    border: 1px solid;
    font-family: verdana,tahoma,sans-serif;
    font-size: 15px;
  }
</style>
