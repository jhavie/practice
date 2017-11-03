<template>
  <div class="block">
    <ep-table :data="tbData" :height="height" :can-edit="false">
      <template v-for="item in columns">
        <ep-table-item
          :key="item.column" :column="item.column"
          :title="item.title" :width="item.width? item.width: '120'"
          :formatter="item.formatter"></ep-table-item>
      </template>
    </ep-table>
  </div>
</template>

<script>
  import { isArray } from 'utils'

  export default {
    name: 'data-grid',

    props: {
      height: {
        type: Number,
        default: 150
      },
      api: String,
      params: Object,
      columns: Array
    },

    methods: {
      getData () {
        this.$post(this.api, this.params).then((json) => {
          this.tbData = json.data.rows
        }).catch(() => {})
      },
      setData (data) {
        if (isArray(data)) {
          this.tbData = data
        } else {
          throw new Error('data must been Array')
        }
      }
    },

    data () {
      return {
        tbData: []
      }
    }
  }
</script>
