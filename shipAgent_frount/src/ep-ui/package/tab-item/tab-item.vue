<template>
  <div class="ep-tabs-panel" v-show="active">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ep-tab-item',

    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: [ String, Number ],
      icon: String
    },
    computed: {
      active () {
        return this.$parent.activeName === this.name
      }
    },
    mounted () {
      this.$parent.addTab(this)
    },
    beforeDestroy () {
      this.$parent.rmTab(this.name)
    }
  }
</script>
