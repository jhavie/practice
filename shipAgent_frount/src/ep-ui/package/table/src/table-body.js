export default {
  name: 'EpTableBody',

  render (h) {
    const colTemp = this.table.table.colTemp
    const expandRen = this.table.table.expandRender
    const $d = this.table.showData
    const $cols = this.table.options.columns

    return (
      <tbody>
        {
          this._l($d, (row, index) => 
            [
              <tr class = {
                [ this.rowsClass? this.rowsClass[index]: null,
                  row.rowHover? 'ep-table-hover': null,
                  row.rowEdit? 'ep-table-edit': null,
                  this.table.table.stripe && index % 2 === 1? 'ep-table-stripe': null ] }
                on-dblclick={ (evt) => { this.handleDblClick(evt, row, index) } }
                on-click={ (evt) => { this.handleClick(evt, row, index) } }>
                {
                  this._l($cols, ($col, cellIndex) => 
                  <td class={[ 
                    colTemp + $col.key, 
                    $col.type !== 'default'? 'ep-table-' + $col.type: null
                  ]}>
                    {
                      this.table.isEdit(row, $col)
                        ? $col.$rE.call(this._renderProxy, h, { row, $col, table: this.table, index })
                        : $col.$r.call(this._renderProxy, h, { row, $col, table: this.table, index })
                    }
                  </td>)
                }
              </tr>,
              this.table.options.expandRows.indexOf(row) > -1
              ? (<tr>
                  <td colspan={ $cols.length } class="ep-table-expand-item">
                    { expandRen ? expandRen(h, { row, index, table: this.table }) : ''}
                  </td>
                </tr>)
              : ''
            ]
          )
        }
      </tbody>
    )
  },

  props: {
    table: {
      require: true
    }
  },

  methods: {
    handleDblClick (evt, row, index) {
      if (evt.target.className !== 'ep-checkbox--inner') {
        this.table.table.$emit('row-dblclick', evt, row, index)
      }
    },
    handleClick (evt, row, index) {
      this.table.table.$emit('row-click', evt, row, index)
      if (this.canEdit) {
        this.table.commit('rowEdit', row, index)
      }
    }
  },

  computed: {
    canEdit () {
      return this.table.table.canEdit
    },
    rowLength () {
      return this.table.showData.length
    },
    rowsClass () {
      let res = []
      let func = this.table.table.rowClass
      // console.log(func)
      if (func) {
        for (let i = 0; i < this.rowLength; i++) {
          res.push(func.call(i))
        }
      }
      return res
    }
  }
}
