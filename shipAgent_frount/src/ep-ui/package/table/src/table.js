/**
 * Table 操作类
 * Table Operate|Data Save|Handle Event|Manage Table
 * @author: Merjiezo
 * @since: 2017-06-20
 */
import { merge, addProps, cloneObj, cloneObjExcept } from './utils'
import { setStyle } from '../../../src/utils/dom'
import $pop from '../../message'


/**选择项 */
const toggleSelect = function (selection, row, toggle, allData) {
  let change = true
  //All Selected clicked
  if (typeof allData !== 'undefined') {
    const length = selection.length
    if (length > 0) {
      selection.splice(0, length)
    } else {
      change = false
    }
    if (toggle) {
      allData.forEach((item) => {
        selection.push(item)
      })
      change = true
    }
  } else {
    if (toggle) {
      //push
      selection.push(row)
    } else {
      //splice
      const index = selection.indexOf(row)
      if (index !== -1) {
        selection.splice(index, 1)
      } else {
        change = true
      }
    }
  }
  
  return change
}

const toggleEdit = function (editer, row) {
  let change = true

  if (!row.rowEdit) {
    editer.push(row)
  } else {
    const index = editer.indexOf(row)
    if (index !== -1) {
      editer.splice(index, 1)
    } else {
      change = true
    }
  }

  return change
}

const toggleExpandRows = function (expandRows, row) {
  let change = true,
      $i     = expandRows.indexOf(row)

  if ($i === -1) {
    expandRows.push(row)
  } else {
    expandRows.splice($i, 1)
    change = false
  }

  return change
}

const handleExpandRowChange = function (table, expandRows, row, index) {
  let change = toggleExpandRows(expandRows, row)
  
  if (change) {
    table.$emit('expand-add', expandRows, row, index)
  } else {
    table.$emit('expand-del', expandRows, row, index)
  }
}

function parseToDOM(str) {
  let div = document.createElement("div")
  if(typeof str == "string")
    div.innerHTML = str
  return div.children[0]
}

const waitIcon = function () {
  let dom = `
    <svg class="ep-button-loading" v-if="loading" width="15px" height="15px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:#AAA"></circle>
    </svg>`
  return parseToDOM(dom)
}

/** Reset Table */
const resetAll = function (table) {
  let optionSet = table.options

  addProps(table.showData, {
    $type: '',
    $nChg: false,
    rowEdit: false,
    rowHover: false,
    firOpen: true
  })

  //Reset Selection
  let options = merge(optionSet, {
    isIndeterminate: false,
    deleteData: [],
    expandRows: []
  })
  optionSet.isAllSelected = false
  optionSet.isIndeterminate = false
  let change = toggleSelect (options.selection, null, false, table.showData)
  if (change) {
    table.table.$emit('selection-change', options.selection)
  }

  let editLen = optionSet.editer.length
  if (editLen > 0) {
    optionSet.editer.splice(0, editLen)
    table.table.$emit('edit-change', options.editer)
  }

  let deleteLen = optionSet.deleteData.length
  if (deleteLen > 0) {
    optionSet.deleteData.splice(0, deleteLen)
  }
}

/*Table Init*/
const Table = function (table, props = {}) {
  if (!table) {
    throw new Error('Table must required!')
  }
  this.index = 0
  this.table = table

  this.twoTable = false
  this.showData = [ ...table.data ]
  this.num = this.showData.length
  this.options = merge({
    isIndeterminate: false,
    hasSelectTemp: false,
    isAllSelected: false,
    selection: [],
    expandRows: [],
    editer: [],
    headers: [],
    columns: [],
    deleteData: []
  }, props)
  if (this.table.height) {
    this.twoTable = true
  }
}

/**计算属性返回每个select对应的v-model */
Table.prototype.isSelected = function (row) {
  return (this.options.selection || []).indexOf(row) > -1
}

Table.prototype.isEdit = function (row, $col) {
  return (this.options.editer || []) .indexOf(row) > -1 && $col.showEdit
}
// Table.prototype.resetSelect = function () {
//   let change = false
//   let tmp = cloneObj(selection)

//   for (let i = 0, j = selection.length; i < j; i++) {
//     if (table.indexOf(selection[i]) > -1) {
//       change = true
//       let $i = tmp.indexOf(selection[i])
//       tmp.splice($i, 1)
//     }
//   }
//   if (tmp.length === 0) {
    
//   }
// }

Table.prototype.getSelectData = function (type) {
  let selection = this.options.selection
  if (type === 'select') {
    return cloneObj(selection)
  } else {
    let res = []
    this.showData.forEach((item) => {
      if (selection.indexOf(item) === -1) {
        res.push(item)
      }
    })
    return cloneObj(res)
  }
}

Table.prototype.getEditData = function (callback) {
  if (this.options.editer.length !== 0) {
    $pop({
      type: 'warning',
      message: '您还有未完成编辑的内容！'
    })
    return
  }
  let res = {
    insert: [],
    delete: [],
    update: []
  }
  //Delete
  let deleteData = this.options.deleteData
  deleteData.forEach((item) => {
    res.delete.push(cloneObj(item))
  })
  
  this.showData.forEach((item) => {
    let $t = item.$type
    if (item.$type !== '') {
      res[$t].push(cloneObj(item))
    }
  })
  for(let item in res) {
    if (res.hasOwnProperty(item)
      && res[item].length === 0) {
      delete res[item]
    }
  }
  callback(res)
}

Table.prototype.updateSelectTemp = function () {
  let options = this.options
  let selection = options.selection
  let length = ( selection || []).length

  if (length === 0
    || this.showData.length === length) {
    options.isIndeterminate = false
  } else {
    options.isIndeterminate = true
  }

  if (this.showData.length === 0 
    && length === 0) {
    options.isAllSelected = false
    return
  }
  
  this.showData.length > length
    ? options.isAllSelected = false
    : options.isAllSelected = true
}

//弃用
Table.prototype.getNext = function () {
  return this.index += 1
}

Table.prototype.updateTable = function () {
  let $h = this.table.dom_body
  if ($h) {
    $h = $h.querySelector('table').clientHeight
  } else {
    return
  }

  let $tb = this.table
  if ($tb.data && $tb.data.length > 0
    && $tb.height) {
    if ($h > $tb.height) {
      $tb.currentHeight = $tb.height
    } else {
      $tb.currentHeight = null
    }
  }
}

//Reset Key And Width
Table.prototype.reRenderColumn = function () {
  let column = this.options.columns
  column.forEach((item, index) => {
    item.key = index
  })
  this.table.getWidth()
}

//EventBus Locate here
Table.prototype.mutations = {
  setData (data) {

    this.showData = cloneObj(this.table.data)
    resetAll(this)
    this.table.$nextTick(() => {
      this.updateTable()
    })
  },
  setDefaultData () {
    let def = {}
    let columns = this.options.columns
    
    columns.forEach((item) => {
      if (item.type !== 'default') {
        return
      }
      let data = null
      if (item.editProps !== undefined
        && item.editProps.default !== undefined) {
        data = item.editProps.default
      }
      def[item.column] = data
    })
    this.options.defaultData = def
  },
  rowEdit (row, index) {
    let change = toggleEdit(this.options.editer, row)
    
    if (change) {
      const table = this.table
      table.$emit('edit-change', this.options.editer, index)
    }
    if (!this.showData[index].rowEdit) {
      this.showData[index].$type = 'update'
    } else {
      if (!row.$nChg) {
        this.showData[index].$type = ''
      }
    }
    this.showData[index].rowEdit = !this.showData[index].rowEdit
  },
  //Equivalent Delete Event
  deleteSelectRow () {
    let selections = this.options.selection,
        deleteData = this.options.deleteData,
        editData   = this.options.editer,
        selLen     = selections.length

    if (selections.length !== 0) {
      //change Sign
      selections.forEach((item) => {
        let $i = this.showData.indexOf(item)
        if (this.showData[$i].rowEdit) {
          let index = editData.indexOf(item)

          if (index !== -1) {
            editData.splice(index, 1)
          }
        }
        if (this.showData[$i].$type !== 'insert') {
          this.showData[$i].$type = 'delete'
          deleteData.push(this.showData[$i])
        }
        this.showData.splice($i, 1)
      })

      this.options.selection.splice(0, selLen)
      this.table.$emit('selection-change', this.options.selection, 0)
      this.updateSelectTemp()
      // this.commit('allSelectedChanged', false)
      this.table.$nextTick(() => {
        this.updateTable()
      })
    } else {
      $pop({
        type: 'warning',
        message: '请至少选择一项进行删除！'
      })
    }
  },
  //Default data null
  addRow (object) {
    let obj = object? { ...object }: { ...this.options.defaultData }
    let def = merge(obj, {
      $type: 'insert',
      $nChg: true,
      rowEdit: false,
      rowHover: false
    })
    this.showData.splice(0, 0, def)

    let change = toggleEdit(this.options.editer, this.showData[0])
    if (change) {
      const table = this.table
      table.$emit('edit-change', this.options.editer, 0)
    }
    this.showData[0].rowEdit = true
    this.table.$nextTick(() => {
      this.updateTable()
    })
  },
  allSelectedChanged (val) {
    let length = this.showData.length
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        this.showData[i].rowHover = val
      }
      let change = toggleSelect(this.options.selection, null, val, this.showData)

      if (change) {
        this.table.$emit('selection-change', this.options.selection)
      }

      this.updateSelectTemp()
    }
    
  },
  rowSelectedChanged (val, row, index) {
    let change = toggleSelect(this.options.selection, row, val)
    this.showData[index].rowHover = val
    
    if (change) {
      const table = this.table
      table.$emit('selection-change', this.options.selection, index)
      table.$emit('select', this.options.selection, row, index)
    }

    this.updateSelectTemp()
  },
  expandRowChange (evt, row, index) {
    const table = this.table
    let expandRows = this.options.expandRows
    if (row.firOpen === 'loading') return
    if (row.firOpen && table.settings.expandDataReq === true) {
      row.firOpen = 'loading'
      let node = waitIcon(),
          target = evt.currentTarget
      
      setStyle(target.querySelector('i'), 'display', 'none')
      target.appendChild(node)
      
      table.$emit('first-open-expand', row, index, {
        // 成功回调
        done: function () {
          let svg = target.querySelector('svg')
          target.removeChild(svg)
          setStyle(target.querySelector('i'), 'display', '')
          row.firOpen = false
          handleExpandRowChange(table, expandRows, row, index)
        },
        // 失败回调
        error: function (info) {
          let svg = target.querySelector('svg')
          target.removeChild(svg)
          setStyle(target.querySelector('i'), 'display', '')
          row.firOpen = true
          if (info) $pop({ type: 'danger', message: info })
        }
      })
    } else {
      handleExpandRowChange(table, expandRows, row, index)
    }
    
  },
  addColumn (column, index) {
    let columns = this.options.columns
    if (!column) {
      throw new Error ('Column must required!')
    }
    if (typeof index !== 'undefined' && index !== -1) {
      columns.splice(index, 0, column)
    } else {
      columns.push(column)
      column.key = columns.length - 1
    }
    this.commit('setDefaultData')
    
    this.table.getWidth()
  },
  destroyColumn (column) {
    let columns = this.options.columns,
        table   = this.table,
        length  = columns.length
    
    table.reRender()
    table.$nextTick(() => {
      columns.splice(0, length)
      table.$nextTick(() => {
        this.reRenderColumn()
      })
    })
  },
  updateColumn (key, source) {
    let columns = this.options.columns
    merge(columns[key], source)
  }
}
//EventBus
Table.prototype.commit = function (name, ...args) {
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this, args)
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

export default Table
