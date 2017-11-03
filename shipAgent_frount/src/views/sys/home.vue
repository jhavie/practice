<template>
	<div class="panel-main-content">
    <ep-row :gutter="10" style="margin-bottom: 0px">
      <ep-col :col="6" class="dashboard-block dashboard-pv">
        <dashboard :show="showNum" :dashboard="dashboard1"
          color="#3498db" @click.native="handleClick('3')"></dashboard>
      </ep-col>
      <ep-col :col="6" class="dashboard-block">
        <dashboard :show="showNum" :dashboard="dashboard2"
          color="#1abc9c" @click.native="handleClick('2')"></dashboard>
      </ep-col>
      <ep-col :col="6" class="dashboard-block">
        <dashboard :show="showNum" :dashboard="dashboard3"
          color="#8e44ad" @click.native="handleClick('4')"></dashboard>
      </ep-col>
      <ep-col :col="6" class="dashboard-block">
        <dashboard :show="showNum" :dashboard="dashboard4"
          color="#E74C3C" @click.native="handleClick('1')"></dashboard>
      </ep-col>
    </ep-row>
    <ep-row :gutter="10">
      <ep-col :col="16" class="dashboard-md">
        <div class="contents-card dashboard-link">
          <h5>统计</h5>
          <div id="dashboard-link"></div>
        </div>
      </ep-col>
      <ep-col :col="8" class="dashboard-md">
        <div class="dashboard-md-left main-col">
          <weather :theme="$store.getters.getTheme"></weather>
        </div>
        <div class="dashboard-md-right main-col">
          <div class="contents-card dashboard-nav">
            <ep-badge is-dot>
              <h5>消息</h5>
            </ep-badge>
            <!-- <p class="no-data">暂无通知</p> -->
            <!-- <marquee  direction="up"  scrollamount="3"> -->
            <marquee class="info" direction="up" scrollamount="3"
              contenteditable="true" loop="-1" onmouseover="this.stop()" onmouseout="this.start()">
              <ul class="dashboard-list">
                <li v-for="(item, index) in inform" :key="index"> 
                  <div class="word">
                    <a href="javascript:void(0)" style="cursor: pointer"
                      @click="billClick(item)"><font color="#2196F3">{{item.billNo}}</font></a>
                  </div>
                  <div class="type">
                    <ep-tag :type="colorTag[item.status].color">{{colorTag[item.status].name}}</ep-tag>
                  </div>
                </li>
              </ul>
            </marquee>
          </div>
        </div>
      </ep-col>
      <ep-col :col="24">
        <div class="contents-card dashboard-news">
          <h5>新闻动态</h5>
          <ul>
            <li class="dashboard-news-item" v-for="(item, index) in news" :key="index">
              <a target="_blank" :class="'panel-' + $store.getters.getTheme + '-text'"
                :href="'http://www.singlewindow.sh.cn/winxportal/news.html?id=' + item.id">
                {{item.title}}</a>
              <small><i class="ion-ios-clock"></i>{{item.pubTime}}</small>
            </li>
          </ul>
        </div>
      </ep-col>
    </ep-row>
  </div>
</template>

<script>
  import { cloneObj, jsonp } from "utils"
  import chart from '../../common/initChart'
  import weather from "../../framework/widgets/weather"
  import dashboard from "../../framework/widgets/dashboard"
  import setTags from 'temp/setting'

  const code = {
    "3": "dashboard1",
    "2": "dashboard2",
    "4": "dashboard3",
    "1": "dashboard4"
  }

  const settings = {
    "dashboard1": {
      icon: 'android-contacts',
      describe: '待审核',
      value: 0
    },
    "dashboard2": {
      icon: 'calculator',
      describe: '自动放行',
      value: 0
    },
    "dashboard3": {
      icon: 'edit',
      describe: '补充填写',
      value: 0
    },
    "dashboard4": {
      icon: 'clipboard',
      describe: '拒绝入区',
      value: 0
    }
  }

  export default {
    name: 'home',

    components: { weather, dashboard },

    created () {  
      let vm = this
      let obj = {
        Cols: "WINXP_TP",
        Div: "OLS",
        Tags: "",
        ShowTime: true
      }
      //数据操作方法测试
      jsonp(0, (data) => {
        vm.news = data.cmsinfosjsobject
      }, obj)

      this.$post('invoiceSearch', {
        pageNo: 1,
        rowsPerPage: 20
      }).then((json) => {
        this.inform = json.data.result
      }).catch (e => {
        // console.error(e)
      })
    },

    mounted () {
      this.$post('statusCount').then((json) => {
        let data     = json.data,
            chatData = { name: [], value: [] }
        
        let notIn = ['1', '2', '3', '4']
        data.forEach((item) => {
          let num = item[0]
          if (['1', '2', '3', '4'].indexOf(num) !== -1) {
            let $i = notIn.indexOf(num)
            if (-1 !== $i) {
              notIn.splice($i, 1)
            }
          }
        })
        notIn.forEach((item) => {
          let innerCode = code[item]
          this[innerCode] = settings[innerCode]
        })

        data.forEach((item) => {
          if (['1', '2', '3', '4'].indexOf(item[0]) !== -1) {
            let innerCode = code[item[0]],
                dashboard = cloneObj(settings[innerCode])
            
            dashboard.value = item[1]
            
            this[innerCode] = dashboard

            chatData.name.push(dashboard.describe)
            chatData.value.push(dashboard.value)
          }
        })
        this.showNum = true
        chart.drawHomeChart(document.getElementById('dashboard-link'), chatData, this)
        this.charts.on('click', (params) => {
        })
      }).catch((e) => {
      })
    },
    methods: {
      handleClick (type) {
        this.$router.push({
          path: 'review',
          query: { status: type }
        })
      },
      billClick (item) {
        this.$router.push({
          path: 'review',
          query: { billNo: item.billNo }
        })
      }
    },
    data () {
      return {
        inform: [],
        dashboard1: {},
        dashboard2: {},
        dashboard3: {},
        dashboard4: {},
        charts: null,
        news: [],
        showNum: false,
        colorTag: setTags.tags
      }
    }
  }
</script>

<style>
  .dashboard-home {
    cursor: pointer;
  }
  .dashboard-icon {
    transition: transform .3s cubic-bezier(.25,.8,.25,1)
  }
  .dashboard-home:hover .dashboard-icon {
    transform: translateX(16px)
  }
  @media only screen and (min-width: 768px) and (max-width: 1200px) {
    .dashboard-block {
      width: 50%
    }
    .dashboard-md {
      width: 100%
    }
    .dashboard-md-left, .dashboard-md-right {
      box-sizing: border-box;
      float: left;
      width: 50%
    }
    .dashboard-md-left {
      padding-right: 10px
    }
    .dashboard-md-right {
      padding-left: 10px
    }    
    .panel-main {
      width: 980px;
    }
  }
</style>