<template>
  <li>
    <label for="">{{ label }}</label>
    <template v-if="color || !currentVal">
      <font :color="val? color: '#DDD'">{{ currentVal? currentVal: '暂无数据' }}</font>
    </template>
    <template v-else>
      {{ currentVal }}
    </template>
  </li>
</template>

<script>
  export default {
    name: 'card-li',
    props: {
      label: String,
      val: {
        type: [String, Number],
        required: true
      },
      formatter: Function,
      color: String
    },

    computed: {
      currentVal () {
        if (this.formatter) {
          return this.formatter(this.val)
        } else {
          if (!this.val) {
            return '暂无数据'
          }
          return this.val
        }
      }
    }
  }
</script>