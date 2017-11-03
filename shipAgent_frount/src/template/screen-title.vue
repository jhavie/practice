<template>
  <div class="screen-title">
    <p @click="handleTiaozhuan">企业提货入区申请</p>
    <span>{{time}}</span><br/>
  </div>
</template>

<script>
  export default {
    name: 'screen-title',

    mounted () {
      setInterval(() => {
        this.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },

    data () {
      return {
        time: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      }
    },
    methods: {
      showPoint ($event) {
        this.$emit('show-point', $event)
      },
      handleTiaozhuan () {
        this.$router.replace('/home')
      }
    }
  }
</script>