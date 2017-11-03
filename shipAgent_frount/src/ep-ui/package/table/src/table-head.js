export default {
  name: 'EpTableHead',

  render (h) {
    const colTemp = this.table.table.colTemp
    const $cols = this.columns

    return (
      <thead>
        <tr>
          {
            this._l($cols, ($col, cellIndex) => 
            <th
              class={[ 
                colTemp + $col.key, 
                $col.type !== 'default'? 'ep-table-' + $col.type: null 
                ]}>
              { $col.$rh.call(this._renderProxy, h, 
                { $col, table: this.table }) 
              }
            </th>)
          }
        </tr>
      </thead>
    )
  },

  props: {
    table: {
      require: true
    }
  },

  computed: {
    columns () {
      return this.table.options.columns
    }
  }
}
