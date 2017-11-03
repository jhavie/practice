<template>
  <div>
    <div class="admin-left">
      <div class="ep-card card-margin block-300">
        <div class="panel panel-default"  style="height: 100%;">
          <div class="card-title center">
            <span class="left weight">HS Code
              <font v-show="hsCode !== ''" class="panel-green-text">: {{ hsCode }}</font>
            </span>
          </div>
          <div class="card-body" style="height: 75%;">
            <chart-hscode ref="hsCodeChart" @set-max="setMaxCode"></chart-hscode>
          </div>
        </div>
      </div>
      <div class="ep-card card-margin block-300 hide">
        <div class="panel panel-default">
          <div class="card-title center">
            <span class="left weight">提单列表</span>
          </div>
        </div>
        <div class="card-body">
          <div class="admin-list-block">
            <ul class="dashboard-list">
              <li v-for="(item, index) in ep_data" :key="index">
                <div class="word">
                  <a href="javascript:void(0)" style="cursor: pointer"
                    @click="billClick(item)"><font color="#2196F3">{{item.billNo}}</font></a>
                </div>
                <div class="type">
                  <ep-tag :type="colorTag[item.status].color">{{colorTag[item.status].name}}</ep-tag>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div style="padding-left: 300px">
      <div class="ep-card card-margin">
        <div class="panel panel-default">
          <div class="card-title center">
            <span class="left weight">舱单审核</span>
          </div>
          <div class="card-body">
            <ep-form ref="searchForm" v-model="searchForm" name-width="100px" inline>
              <ep-form-item attr="billNo" label="提单号">
                <ep-input v-model="searchForm.billNo" name="billNo"></ep-input>
              </ep-form-item>
              <ep-form-item attr="status" label="状态">
                <ep-select v-model="searchForm.status" :label="label"></ep-select>
              </ep-form-item>
              <ep-button type="warning" size="small" @click="reset('searchForm')">重置</ep-button>
              <ep-button type="primary" size="small" @click="refresh(true)">搜索</ep-button>
              <ep-button size="small" type="success" @click="changeStatus('6')" v-if="nowBill.status === '3'">人工放行</ep-button>
              <ep-button size="small" type="danger" @click="changeStatus('5')" v-if="nowBill.status === '3'">人工拒绝</ep-button>
              <ep-button size="small" type="info" @click="changeStatus('7')" v-if="nowBill.status === '3'">人工判断补录入</ep-button>
            </ep-form>
          </div>
        </div>
      </div>
      <input-bill ref="iptBill" :is-edit="true"></input-bill>
    </div>
  </div>
</template>

<script>
  import inputBill from './input'
  import chartHscode from 'temp/chartHsCode'
  import misList from 'src/common/mislist'
  import settings from 'temp/setting'

  export default {

    components: { inputBill, chartHscode },

    extends: misList,

    name: 'admin',

    created () {
      let status = this.$route.query.status
      undefined !== status && status != '-1'
        ? this.searchForm.status = status
        : null
      
      let billNo = this.$route.query.billNo
      billNo
       ? this.searchForm.billNo = billNo
       : null
      
      this.doRefresh()
    },

    watch: {
      'ep_data' (val) {
        if (val.length > 0) {
          this.billClick(val[0])
        }
      } 
    },

    methods: {
      setMaxCode (code, bill) {
        this.hsCode = code
      },
      billClick (item) {
        let billNo = item.billNo
        this.nowBill = item
        if (billNo) {
          this.searchForm = {
            billNo: billNo,
            status: item.status
          }
          this.$refs.hsCodeChart.resetChart(item)
          this.$refs.iptBill.setData(billNo)
        }
      },
      changeStatus (status) {
        this.$post('billStatus', {
          billNo: this.nowBill.billNo,
          status: status
        }, true).then((json) => {
          this.nowBill.status = status
        }).catch((e) => {})
      }
    },

    data () {
      return {
        nowBill: {},
        hsCode: '',
        result: [],

        listApi: 'invoiceSearch',
        searchForm: {
          billNo: '',
          status: ''
        },
        label: [
          { value: '1', label: '拒绝入区' },
          { value: '2', label: '自动放行' },
          { value: '3', label: '待审核' },
          { value: '4', label: '待补充数据' },
          { value: '5', label: '人工拒绝' },
          { value: '6', label: '人工放行' }
        ],
        totalcount: 0,
        ep_page: {
          limit: 10,
          offset: 1
        },
        ep_data: [],

        colorTag: settings.tags
      }
    }

  }
</script>
