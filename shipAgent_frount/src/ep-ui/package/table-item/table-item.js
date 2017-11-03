//Template
const TEMP = {
  default: {
    layout: {
      minWidth: 120,
    },
    renderHead: function (h, { $col, table }) {
      if (typeof $col.title !== 'undefined') {
        return $col.title
      } else {
        return $col.column
      }
    },
    render: function (h, { row, $col }) {
      const col = $col.column
      if ($col && $col.formatter) {
        return $col.formatter(row, $col);
      }

      if (col && col.indexOf('.') === -1) {
        return row[col];
      }
      // TODO
      return ''
    },
    renderEdit: function (h, { row, $col, table }) {
      let col       = $col.editProps, 
          editers   = table.options.editer,
          $i        = editers.indexOf(row),
          column    = $col.column,
          render,
          innerEval = function (val) {
            editers[$i].$nChg = true
            editers[$i][column] = val
          }

      if ($i === -1) {
        console.error('组件内部错误，联系开发人员')
      }
      switch (col.type) {
        case 'input':
          render = <div on-click:stop={ () => {} }><ep-input
            value={ editers[$i][column] }
            on-input={ innerEval }></ep-input></div>
          break
        case 'select':
          render = <div on-click:stop={ () => {} }><ep-select
            value={ editers[$i][column] }
            label={ col.label }
            on-input={ innerEval }></ep-select></div>
          break;
        default:
          //input
          render = <div on-click:stop={ () => {} }><ep-input
            value={ editers[$i][column] }
            on-input={ innerEval }></ep-input></div>
          break
      }
      return render
    }
  },
  select: {
    layout: {
      width: 48
    },
    renderHead: function (h, { $col, table }) {
      let options = table.options

      return <ep-checkbox 
        indeterminate={ options.isIndeterminate }
        value={ options.isAllSelected }
        on-input={ (val) => { table.commit('allSelectedChanged', val) } }/>      
    },
    render: function (h, { row, $col, table, index }) {
      return <ep-checkbox
        value={ table.isSelected(row) }
        on-input={ (val) => { table.commit('rowSelectedChanged', val, row, index) } } />
    }
  },
  num: {
    layout: {
      width: 48
    },
    renderHead: function (h) {
      return '#'
    },
    render: function (h, { index }) {
      return index + 1
    }
  },
  expand: {
    layout: {
      width: 48
    },
    renderHead: function (h) {
      return <div class="ep-table-expand-icon">
        <i class="ion-chevron-right"></i>
      </div>
    },
    render: function (h, { row, table, index }) {
      const expanded = table.options.expandRows.indexOf(row) > -1
      return <div class={ 'ep-table-expand-icon ' + (expanded ? 'active' : '') }
        on-click:stop={ (evt) => table.commit('expandRowChange', evt, row, index) }>
        <i class="ion-chevron-right"></i>
      </div>
    }
  }
}

function initColumn (config) {
  const type = config.type
  if (type !== 'default') {
    config.width = TEMP[type].layout.width
  }
  config.$r = TEMP[type].render
}

/**
 * 整理Edit数据
 * @param {*初始数据} tbItem 
 */
function editStyle (tbItem) {

}

export default {
  name: 'EpTableItem',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    title: String,
    column: {
      type: String
    },
    width: String,
    minWidth: String,
    formatter: Function,
    /**
     * 基于jsx的解决方案
     * 新版本不推荐使用
     */
    cellRender: [ Function ],
    //是否为可编辑
    isEdit: {
      type: Boolean,
      default: true
    },
    editProps: {
      type: Object,
      default () {
        return {
          type: 'input'
        }
      }
    }
  },

  methods: {
    // Data cleaning
    $renderConfig () {
      if (!this.parentTb) return
      
      if (this.type === 'default' && this.column === undefined) {
        throw new Error('ep-table-item must have property column')
      }

      let type = this.type
      this.$options.render = h => h('div', this.$slots.default)
      let renderHead = TEMP[type].renderHead
      
      let width = this.width
      if (width !== undefined) {
        width = parseInt(width, 10)
        if (isNaN(width)) {
          width = null
        }
      }

      let minWidth = this.minWidth
      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10)
        if (isNaN(minWidth)) {
          minWidth = TEMP[type].layout.minWidth
        }
      } else {
        minWidth = TEMP[type].layout.minWidth
      }

      //Table templste share
      let config = {
        //唯一标识
        key: null,
        type: type,
        title: this.title,
        column: this.column,
        minWidth: minWidth,
        width: width,
        formatter: this.formatter,
        // Render Function
        $r: null,
        $rh: renderHead,
        userRender: false,
        showEdit: false,
        editProps: this.editProps
      }
      initColumn(config)
      this.config = config

      let vm = this

      if (type === 'select') {
        this.parentTb.table.options.hasSelectTemp = true
        return
      }

      if (type === 'expand') {
        this.parentTb.expandRender = function(h, data) {
          return vm.$scopedSlots.default
            ? vm.$scopedSlots.default(data)
            : vm.$slots.default
        }
        
        return
      }

      if (type === 'default') {
        let $r = null
        config.$rE = TEMP.default.renderEdit
        config.$r = function (h, data) {
          if (vm.cellRender) {
            $r = vm.cellRender
          }

          //借鉴Element UI的render
          if (vm.$vnode.data.inlineTemplate) {
            $r = function() {
              data.vm = vm.context || data.vm
              if (Object.prototype.toString.call(data.vm) === '[object Object]') {
                for (let prop in data.vm) {
                  if (!data.hasOwnProperty(prop)) {
                    data[prop] = data.vm[prop]
                  }
                }
              }
              // 静态内容会缓存到 _staticTrees 内，不改的话获取的静态数据就不是内部 context
              data._staticTrees = vm._staticTrees
              data.$options.staticRenderFns = vm.$options.staticRenderFns
              return vm.customRender.call(data)
            }
          } else if (vm.$scopedSlots.default) {
            $r = () => vm.$scopedSlots.default(data)
          }

          if (!$r) {
            $r = TEMP.default.render
            if (vm.isEdit) {
              config.showEdit = true
            }
          }
          return $r(h, data)
        }
      }

    }
  },

  
  created () {
    this.$renderConfig()
  },

  // After Render
  mounted () {
    let table  = this.parentTb.table,
        parent = this.$parent

    let itemIndex = [].indexOf.call(parent.$el.children, this.$el)
    this.config.key = itemIndex
    // console.log(itemIndex)
    table.commit('addColumn', this.config, itemIndex)

    //ReRender Column
    this.$on('ep.table.reRender', () => {
      let itemIndex = [].indexOf.call(parent.$el.children, this.$el)
      this.config.key = itemIndex
      
      /**
       * ReRender Config
       * Because when Destroy table item
       * config attribute is wrong!
       */
      // this.$renderConfig()
      table.commit('addColumn', this.config, itemIndex)
    })
  },

  data () {
    return {
      config: null
    }
  },

  destroyed () {
    if (!this.$parent) return
    this.parentTb.table.commit('destroyColumn', this.config)
  },

  watch: {
    width (val) {
      this.parentTb.table.commit('updateColumn', this.key, {
        width: val
      })
    },
    column (val) {
      this.parentTb.table.commit('updateColumn', this.key, {
        column: val
      })
    },
    formatter (val) {
      this.parentTb.table.commit('updateColumn', this.key, {
        formatter: val
      })
    },
    editProps (val) {
      this.parentTb.table.commit('updateColumn', this.key, {
        editProps: val
      })
    },
    title (val) {
      this.parentTb.table.commit('updateColumn', this.key, {
        title: val
      })
    }
  },

  computed: {
    parentTb() {
      let parent = this.$parent
      while (parent 
        && parent.$options._componentTag !== 'ep-table') {
        parent = parent.$parent
      }
      return parent
    }
  }
}