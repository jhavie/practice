<template>
  <div class="ep-table-wrap">
    <div class="ep-table-hidden"><slot></slot></div>

    <!-- 根据height参数提供两种Table渲染方式，提高基础表格的渲染效率 -->
    <template v-if="!height">
      <table class="ep-table" 
        :class="{ 'ep-table-border': border }"
        :style="{ width: tbWidth? tbWidth: '100%' }">
        <!-- Table layout attribute -->
        <colgroup>
          <col v-for="column in columns"
            :name="colTemp + column.key"
            :width="column.width"/> 
        </colgroup>
        <table-head :table="table"></table-head>
        <table-body :table="table"></table-body>
      </table>
      <div :style="{ width: tbWidth? tbWidth: '100%' }" class="ep-table-empty-block"
        v-if="!data || data.length === 0">
        <p class="ep-table-empty-text">
          <slot name="empty">{{ emptyText || '无数据' }}</slot>
        </p>
      </div>
    </template>

    <template v-else>
      <!-- complicated Table head -->
      <div class="ep-table-head" :class="{ 'ep-table-shadow': headShadow }">
        <table class="ep-table"
          :class="{ 'ep-table-border': border }"
          :style="{ width: tbWidth? tbWidth: '100%' }">
          <colgroup>
            <col v-for="column in columns"
              :name="colTemp + column.key"
              :width="column.width"/>
          </colgroup>
          <table-head :table="table"></table-head>
        </table>
      </div>
      <!-- complicated Table body -->
      <div class="ep-table-body" :style="{ height: currentHeight !== null? currentHeight + 'px': null }">
        <table class="ep-table" 
          :class="{ 'ep-table-border': border }"
          :style="{ width: tbWidth? tbWidth: '100%' }">
          <colgroup>
            <col v-for="column in columns"
              :name="colTemp + column.key"
              :width="column.width"/>
          </colgroup>
          <table-body :table="table"></table-body>
        </table>
        <div :style="{ width: tbWidth? tbWidth: '100%' }" class="ep-table-empty-block"
          v-if="!data|| data.length === 0 || table.showData.length === 0">
          <p class="ep-table-empty-text">
            <slot name="empty">{{ emptyText || '无数据' }}</slot>
          </p>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
  import { getTbNext, getWidth } from './src/utils'
  import TableHead from './src/table-head'
  import TableBody from './src/table-body'
  import Table from './src/table'
  import { on, off } from '../../src/utils/dom'
  import throttle from "throttle-debounce/throttle"
  import emitter from "../../src/mixins/emitter"

  export default {

    name: 'EpTable',

    mixins: [ emitter ],

    components: { TableHead, TableBody },

    props: {
      defaultData: Object,
      defaultSelected: Array,
      data: Array,
      stripe: Boolean,
      border: Boolean,
      height: Number,
      rowClass: Function,
      emptyText: String,
      canEdit: {
        type: Boolean,
        default: false
      },
      // 扩展属性
      settings: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    mounted () {
      this.getWidth()
      this.initEvt()
      if (this.table.options.defaultData === undefined) {
        this.table.commit('setDefaultData')
      }
    },
      
    data() {
      let defaultData = this.defaultData
      const table = new Table(this, {
        defaultData
      })
      return {
        headShadow: false,
        currentHeight: this.height + 'px',
        dom_head: null,
        dom_body: null,
        table,
        nowTable: `eptb_${getTbNext()}`,
        tbWidth: null,
        expandRender: null
      }
    },

    watch: {
      data: {
        immediate: true,
        handler(val) {
          this.table.commit('setData', val)
        }
      },
      height (val) {
        this.table.updateTable()
      }
    },

    methods: {
      resizeHeight () {
        
      },
      reRender () {
        this.broadcast('ep-table-item', 'ep.table.reRender')
      },
      //TODO
      editResetToShowData () {
        
      },
      reset () {
        this.table.commit('setData', this.data)
      },
      hasEditer () {
        return this.table.options.editer.length !== 0
      },
      getData(type) {
        return this.table.getSelectData(type)
      },
      deleteSelectRow () {
        this.table.commit('deleteSelectRow')
      },
      addRow (object) {
        this.table.commit('addRow', object)
      },
      getSaveData (callback) {
        this.table.getEditData(callback)
      },
      getWidth () {
        let $width = this.$el.clientWidth
        
        this.tbWidth  = getWidth($width, this.columns)
        this.tbWidth
          ? this.tbWidth += 'px'
          : null
      },
      initScroll () {
        if (this.height !== undefined) {
          this.dom_head = this.$el.querySelector('.ep-table-head')
          this.dom_body = this.$el.querySelector('.ep-table-body')

          let vm = this
          this.isScroll = (evt) => {
            vm.dom_head.scrollLeft = evt.target.scrollLeft
            if (evt.target.scrollTop !== 0) {
              vm.headShadow = true
            } else {
              vm.headShadow = false
            }
          }

          on (this.dom_body, 'scroll', this.isScroll)
        }
      },
      initEvt () {
        // Resize Width
        let vm = this
        this.changeSize = throttle(300, (evt) => { vm.getWidth() })
        on (window, 'resize', this.changeSize)

        // Scroll Evt
        this.initScroll()
      },
      changeParame (id, key, value) {
        this.columns
      }
    },
    computed: {
      colTemp () {
        return `${this.nowTable}_column_`
      },
      columns () {
        return this.table.options.columns
      }
    },

    beforeDestroy () {
      off (this.dom_body, 'scroll', this.isScroll)
      off (window, 'resize', this.changeSize)
    }
  }
</script>
