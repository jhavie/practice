<template>
  <div class="ep-transfer">
    <list :list="currectList" @change="handleChange" attr="left"></list>
    <div class="ep-transfer-options">
      <ep-button type="text" size="small" icon="chevron-right" @click="handleClick('right')" :disabled="leftDisabled"></ep-button><br>
      <ep-button type="text" size="small" icon="chevron-left" @click="handleClick('left')" :disabled="rightDisabled"></ep-button>
    </div>
    <list :list="value" @change="handleChange"  attr="right"></list>
  </div>
</template>

<script>
  import list from "./list"

  export default {

    name: 'ep-transfer',

    components: { list },

    props: {
      leftDefActive: Array,
      rightDefActive: Array,
      value: {
        type: Array,
        default () {
          return []
        }
      },
      list: Array
    },

    mounted () {
      if (this.leftActive && this.leftActive.length > 0) {
        this.leftDisabled = false
      }
      if (this.rightActive && this.rightActive.length > 0) {
        this.rightDisabled = false
      }
    },

    data () {
      return {
        currectList: this.list,
        leftActive: [],
        rightActive: [],
        leftDisabled: true,
        rightDisabled: true
      }
    },

    methods: {
      handleClick (type) {
        if (type === 'right' && this.leftActive.length === 2) {
          this.$emit('input', this.value.concat(this.leftActive[1]))
          this.$nextTick(() => {
            this.currectList = this.leftActive[0]
            this.leftActive = []
          })
          this.leftDisabled = true
        }
        if (type === 'left' && this.rightActive.length === 2) {
          this.currectList = this.currectList.concat(this.rightActive[1])
          this.$nextTick(() => {
            this.$emit('input', this.rightActive[0])
            this.rightActive = []
          })
          this.rightDisabled = true
        }
        
      },
      handleChange (val, type) {
        if (val[1].length > 0) {
          this[`${type}Disabled`] = false
        } else {
          this[`${type}Disabled`] = true
        }
        this[`${type}Active`] = val
      }
    }
  }
</script>
