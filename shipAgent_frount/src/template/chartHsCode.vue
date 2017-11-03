<template>
  <div style="height: 100%;">
    <p class="no-data" v-if="loading">加载中...</p>
    <div style="height: 85%;" v-if="!loading">
      <p class="center mini-font padding-bottom" v-if="status === '1'"><font color="red">拒绝入区</font></p>
      <p class="center mini-font padding-bottom" v-if="status === '2'"><font color="green">自动放行</font></p>
      <p class="center mini-font padding-bottom" v-if="status === '3'"><font>待审核</font></p>
      <p class="center mini-font padding-bottom" v-if="status === '4'">需录入完整信息<br/><br/>
        <img src="../assets/frame/robot-blue.png" alt="" height="180px">
      </p>
      <p class="center mini-font padding-bottom" v-if="status === '6'"><font color="green">人工放行</font></p>
      <p class="center mini-font padding-bottom" v-if="status === '5'"><font color="red">人工拒绝</font></p>
      <div class="chart-result" id="searchResult"
        v-show="status === '1' || status === '2' || status === '3' || status === '5' || status === '6'  || status === '7'"></div>
    </div>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import chart from '../common/initChart'

  export default {

    name: 'chartHsCode',

    methods: {
      resetChart (item) {
        let billNo = item.billNo
        this.billNo = billNo
        this.loading = true
        this.$post('submitML', {
          billNo: billNo
        }).then((json) => {
          this.status = item.status
          this.loading = false
          // if (json.data.length === 0) { this.status = '4' }
          // if (json.data.length === 1) { this.status = '2' }
          // if (json.data.length > 1) { this.status = '3' }

          let max    = 0,
              hsCode = ''
          json.data.every((item) => {
            if (item.prob > max) {
              max = item.prob
              hsCode = item['HS']
            }
          })
          this.$emit('set-max', hsCode)

          this.$nextTick(() => {
            if (json.data.length > 0) {
              this.chartHsCodeChance !== null? this.chartHsCodeChance.dispose(): null
              this.chartHsCodeChance = null
              chart.drawHsCodeChance(document.querySelector('#searchResult'), json.data, this)
              this.chartHsCodeChance.on('click', (params) => {
                const h = this.$createElement
                // this.$pop(params.data.name)
                Notification({
                  title: `HS Code: ${params.name}`,
                  message: h('div', [
                    h('i', { style: 'color: green'}, `概率: ${params.data.value}%`),
                    h('br'),
                    h('i', { style: 'color: teal'}, params.data.name)
                  ])
                })
              })
            }
          })
        }).catch((e) => {})
      }
    },

    data () {
      return {
        billNo: '',
        loading: true,
        status: '',
        chartHsCodeChance: null
      }
    }
  }
</script>

<style>
  .chart-result {
    margin: auto;
    /* width: 160px; */
    height: 100%;
  }
</style>