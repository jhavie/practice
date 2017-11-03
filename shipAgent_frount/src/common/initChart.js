/**
 * 初始化图标工具类
 * @author: Merjiezo
 * @since: 2017-10-23
 */
import echarts from 'echarts'
import { setStyle } from 'utils'

const color = ['#0099FF', '#00CC99', '#63B3FC', '#99CCCC', '#9999FF', '#FA5793', '#FF9966', '#FF6600', '#996633', '#666']
//const color = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

/**
 * 格式化小数位
 * @param {*小数} src 
 * @param {*保留几位} pos 
 */
function fomatFloat (src, pos) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos)
}

/**
 * 整理请求前十数据
 */
function initHsCodeChanceData (data) {
  let result = {
    key: [],
    data: []
  }
  data.forEach((item) => {
    result.key.push(item['HS'])
    result.data.push({
      value: item.prob * 100,
      name: item.name,
      status: item.status ? item.status : -1
    })
  })
  result.key = result.key.reverse()
  result.data = result.data.reverse()
  return result
}

export default {

  drawHomeChart ($dom, data, vm) {
    vm.charts = echarts.init($dom, {
      width: '100%'
    })
    vm.charts.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      color: color,
      legend: {
        data: ['数量（个）']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: data.name
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: function (params) {
              if (params.name === '自动放行') { return '#27AE60' }
              if (params.name === '补充填写') { return 'rgb(142, 68, 173)' }
              if (params.name === '待审核') { return 'rgb(52, 152, 219)' }
              if (params.name === '拒绝入区') { return 'rgb(231, 76, 60)' }
            }
          }
        },
        barWidth: 30,
        hsName: '数量（个）',
        type: 'bar',
        data: data.value
      }]
    })
  },

  drawHsCodeChance ($dom, data, vm) {
    let toggleShow = false
    if ($dom.clientWidth > 485) {
      toggleShow = true
    }

    const chartsData = initHsCodeChanceData(data)
    vm.chartHsCodeChance = echarts.init($dom, {
      height: '100%'
    })
    vm.chartHsCodeChance.setOption({
      // title: {
      //   text: 'HS Code',
      //   subtext: `提单: ${vm.billNo}`,
      //   x: 'right'
      // },
      color: color,
      angleAxis: {
        max: 100
      },
      radiusAxis: {
        type: 'category',
        data: chartsData.key,
        z: 10
      },
      polar: {
      },
      series: [{
        type: 'bar',
        data: chartsData.data,
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: (item) => {
              if (item.data.status !== -1) {
                return '#E74C3C'
              }
              let color = ['#F39C12', '#2196F3', '#27AE60']
              return color[item.dataIndex]
            }
          }
        }
      }],
      legend: {
        show: true
      }
    })
  }

}
