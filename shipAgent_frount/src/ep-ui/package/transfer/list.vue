<template>
  <div class="ep-transfer-list">
    <div class="ep-transfer-list-head">
      <ep-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</ep-checkbox>
    </div>
    <div class="ep-transfer-list-body">
      <p v-if="list.length === 0" class="ep-transfer-nodata">暂无数据</p>
      <ep-checkbox-group @change="handlecheckboxChange" v-model="checked">
        <transition-group :name="'ep-transfer-' + attr + 'list'" tag="ul">
          <li v-for="(item, index) in list" v-bind:key="index" class="ep-transfer-item">
            <ep-checkbox :label="item.key" :disabled="item.disabled">{{ item.label }}</ep-checkbox>
          </li>
        </transition-group>
      </ep-checkbox-group>
    </div>
  </div>  
</template>

<script>
  import epCheckboxGroup from '../checkbox-group'
  import epCheckbox from '../checkbox'

  /* 返回未选中和选中 */
  function getNowList (arr, keyArr) {
    let tmp = [ ...arr ],
        res = []
    if (arr.length === keyArr.length) {
      return [ res, tmp ]
    }

    for (let i = 0, j = keyArr.length; i < j; i++) {
      let num = -1;
      tmp.every((item, index) => {
        if (item.key === keyArr[i]) {
          num = index
          res.push(item)
          return false
        }
        return true
      })
      if (num !== -1) {
        tmp.splice(num, 1)
      }
    }
    return [ tmp, res ]
  }

  export default {

    components: { epCheckbox, epCheckboxGroup },

    props: {
      attr: String,
      list: {
        type: Array,
        default () {
          return []
        }
      }
    },

    mounted () {
      if (this.checked.length > 0) {
        this.isIndeterminate = true
      }
    },

    watch: {
      list (val) {
        //重置所有内容
        this.checked = []
        this.checkAll = false
        this.isIndeterminate = false
      }
    },

    computed: {
      options () {
        let res = [];

        this.list.forEach((item) => {
          if (!item.disabled) {
            res.push(item.key)
          }
        })
        return res
      }
    },

    data () {
      return {
        checkAll: false,
        isIndeterminate: false,
        checked: []
      }
    },

    methods: {
      handleCheckAllChange (event) {
        this.checked = event.target.checked ? this.options : []
        this.isIndeterminate = false
        
        let clicked = getNowList(this.list, this.checked)
        this.$emit('change', clicked, this.attr)
      },
      handlecheckboxChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.list.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length

        let clicked = getNowList(this.list, this.checked)
        this.$emit('change', clicked, this.attr)
      }
    }
  }
</script>
