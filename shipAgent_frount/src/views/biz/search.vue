<template>
  <div class="search">

    <div id="canvas-particle" :style="{ height: height + 'px' }">
      <screen-title></screen-title>

      <div style="left: 0px;right: 0px; margin:auto; position: fixed; width: 1090px; min-height: 300px; z-index: 5; top: 20%;">
        <div style="float: left">
          <div class="ep-card card-margin hide" style="height: 100%; width: 275px;">
            <div class="panel panel-default">
              <div class="card-title center">
                <span class="left weight">提单列表</span>
              </div>
            </div>
            <div class="card-body">
              <div class="admin-list-block" style="height: 500px;">
                <ul class="dashboard-list">
                  <li v-for="(item, index) in ep_data" :key="index">
                    <div class="word">
                      <a href="javascript:void(0)" style="cursor: pointer"><font color="#2196F3"
                        @click="billClick(item)">{{item.billNo}}</font></a>
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
        <div style="padding-left: 260px;">
          <div class="search-block">
            <div class="card card-shadow"
              style="background: transparent" v-show="showSearch">
              <div class="logo-search search-logo">
                <img src="../../assets/logo.png" width="80px" @click="handleClick"/>
              </div>
              <div class="login-main search-main">
                <div class="search-input" key="input">
                  <ep-form ref="form" :form="form" name-width="70px" inline
                    name-position="left" :rules="page_rules">
                    <ep-form-item label="船名" attr="vessel">
                      <ep-input v-focus v-model="form.vessel" :maxlength="40"></ep-input>
                    </ep-form-item>
                    <ep-form-item label="航次" attr="voyage">
                      <ep-input v-model="form.voyage" :maxlength="20"></ep-input>
                    </ep-form-item>
                    <ep-form-item label="提单号" attr="billNo" required>
                      <ep-input v-model="form.billNo" :minlength="6" :maxlength="40"></ep-input>
                    </ep-form-item>
                    <ep-button size="small" type="success" @click="handleSubmit" :loading="loadingBtn">申请</ep-button>
                  </ep-form>
                </div>
              </div>
              <div class="login-copyright" style="font-weight: 400; height: 30px; background: #FFF"><p>Copyright (C) 2001-2017 easipass.com. All Rights Reserved</p></div>
            </div>
              <div v-show="showResult" style="background: transparent; padding: 14px 0 0 0;" key="result">
                <div class="card card-shadow">
                  <div class="card-title center"><span class="left weight">结果</span></div>
                  <div class="card-body">
                    <!-- <a href="javascript:void(0)" @click="showResult = true"
                      class="panel-blue-text" style="font-size: 14px">收起</a><br/><br/> -->
                    <div style="min-height: 90px;">
                      <ep-alert v-if="status !== ''" :title="billStatus[status].title" :description="billStatus[status].description"
                      :type="billStatus[status].type" show-icon :closable="false"></ep-alert>
                      <div class="main-col" style="padding-top: 12px">
                        <div class="right">
                          <a href="javascript:void(0)" @click="handleFull"
                            class="panel-blue-text" style="font-size: 14px"
                            v-show="status === '4' || status === '7'">录入完整信息</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- </transition> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CanvasParticle from 'lib/canvas-particle'
  import robot from '../../framework/robot'
  import screenTitle from 'temp/screen-title'
  import Transition from '../../ep-ui/src/mixins/menu-transition'
  import setting from 'temp/setting'
  import misList from 'src/common/mislist'

  export default {

    mixins: [ Transition ],

    extends: misList,

    components: { screenTitle, robot },

    created () { this.doRefresh() },

    mounted () {
      this.showSearch = true
      CanvasParticle({
        vx: 4,//点x轴速度,正为右，负为左
        vy:  4,//点y轴速度
        height: 2,//点高宽，其实为正方形，所以不宜太大
        width: 3,
        count: 250,//点个数
        color: "121, 162, 185",//点颜色
        stroke: "33, 150, 243",//线条颜色
        dist: 8000,//点吸附距离
        e_dist: 20000,//鼠标吸附加速距离
        max_conn: 10//点到点最大连接数
      })
    },
    methods: {
      handleSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loadingBtn = true
            this.$post('submitML', this.form).then((json) => {
              this.send.billNo = this.form.billNo
              this.loadingBtn = false
              if (json.data.length === 0) { this.status = '4' }
              if (json.data.length === 1) { this.status = '2' }
              if (json.data.length > 1) { this.status = '3' }

              let max = 0
              json.data.every((item) => {
                if (item.prob > max) {
                  max = item.prob
                  this.send.hsCode = item['HS']
                }
              })

              this.$nextTick(() => {
                this.showResult = true
              })
            }).catch((e) => {
              this.loadingBtn = false
            })
          }
        })
      },
      handleInput () {
        this.$router.push('input')
      },
      handleClick () {
        this.form = {
          vessel:"CSCL LONG BEACH",
          voyage:"0080E",
          billNo:"RTMSHA106414"
        }
      },
      handleSend () {
        this.$post('addHsBill', this.send, false).then((json) => {}).catch((e) => {})
      },
      handleFull () {
        this.$router.push('/user/input')
      },
      billClick (item) {
        this.form.billNo = item.billNo
        this.status = item.status
      }
    },
    data () {
      return {
        status: '',
        chartHsCodeChance: null,
        loadingBtn: false,
        showSearch: false,
        showResult: true,
        height: document.body.offsetHeight,
        form: {
          vessel: '',
          voyage: '',
          billNo: ''
        },
        send: {
          billNo: '',
          status: '3',
          hsCode: ''
        },
        page_rules: {
          billNo: { required: true, max: 40, message: '必须填写', trigger: 'blur' }
        },
        billStatus: setting.alert,
        colorTag: setting.tags,

        listApi: 'invoiceSearch',
        searchForm: {
          billNo: '',
          status: ''
        },
        totalcount: 0,
        ep_page: {
          limit: 10,
          offset: 1
        },
        ep_data: [],
        page: {
          No: 1,
          rowsPage: 20
        }
      }
    }
  }
</script>

<style>
  .search {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .search-logo, .search-main {
    background: #FFF;
  }
  .search-logo {
    text-align: center;
    padding-top: 24px
  }
  .search-result {
    margin: auto;
    height: 190px
  }
  .search-back {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
  }
  .search-block {
    width: 830px;
    left: 400px;
    right: auto;
  }
  .search-main {
    margin: 0;
    padding: 12px 15px 12px 15px;
    width: 780px;
  }
  .fade-search-enter-active, .fade-search-leave-active {
    transition: all .3s cubic-bezier(.23,1,.32,1)
  }
  .fade-search-enter, .fade-search-leave-active {
    transform: translateX(-50px);
    opacity: 0
  }
</style>
