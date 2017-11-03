<template>
  <div class="panel-main-content">
    <!--筛选栏组-->
    <div class="ep-card card-margin">
      <div class="panel panel-default">
        <div class="card-title center">
          <span class="left weight">筛选</span>
        </div>
        <ep-form ref="searchForm" v-model="searchForm" name-width="100px">
          <ep-row :gutter="7">
            <ep-col :col="6">
              <ep-form-item attr="billNo" label="提单号">
                <ep-input v-model="searchForm.billNo" name="billNo"></ep-input>
              </ep-form-item>
            </ep-col>
            <ep-col :col="6">
              <ep-form-item attr="status" label="状态">
                <ep-select v-model="searchForm.status" :label="label"></ep-select>
              </ep-form-item>
            </ep-col>
            <ep-col :col="6">
              <ep-button type="warning" size="small" @click="reset('searchForm')">重置</ep-button>
              <ep-button type="primary" size="small" @click="refresh(true)">搜索</ep-button>
            </ep-col>
          </ep-row>
        </ep-form>
      </div>
    </div>
    <!--表格-->
    <div class="ep-card card-margin">
      <div class="card-title center">
        <span class="left weight">提单列表</span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-table ref="table" :data="ep_data" @selection-change="handleSelectionChange">
            <ep-table-item column="id" title="序号" width="120">
              <template scope="props">
                <a href="javascript:void(0)" class="panel-blue-text"
                  @click="showDetail(props.row, props.index, '1')">{{ props.row.id }}</a>
              </template>
            </ep-table-item>
            <ep-table-item column="billNo" title="提单号"></ep-table-item>
            <ep-table-item column="status" title="状态">
              <template scope="props">
                <template v-if="props.row.status === '1'">
                  <ep-tag type="danger">拒绝入区</ep-tag>
                </template>
                <template v-if="props.row.status === '2'">
                  <ep-tag type="success">自动审核</ep-tag>
                </template>
                <template v-if="props.row.status === '3'">
                  <ep-tag type="primary">需待审核</ep-tag>
                </template>
                <template v-if="props.row.status === '4'">
                  <ep-tag type="warning">待补充数据，请补充完整</ep-tag>
                </template>
                <template v-if="props.row.status === '5'">
                  <ep-tag type="grey">拒绝</ep-tag>
                </template>
                <template v-if="props.row.status === '6'">
                  <ep-tag type="success">放行</ep-tag>
                </template>
              </template>
            </ep-table-item>
            <ep-table-item column="hsCode" title="HS Code"></ep-table-item>
            <ep-table-item column="action" title="操作" width="200">
              <template scope="props">
                <ep-button @click="showDetail(props.row, props.index, '1')" type="info" size="mini">详细</ep-button>
                <ep-button @click="changeStatus(props.row, props.index, '5')" type="danger" size="mini" v-if="props.row.status === '3'">拒绝</ep-button>
                <ep-button @click="changeStatus(props.row, props.index, '6')" type="success" size="mini" v-if="props.row.status === '3'">放行</ep-button>
                <ep-button @click="showDetail(props.row, props.index, '2')" type="primary" size="mini" v-if="props.row.status === '4'">完善资料</ep-button>
              </template>
            </ep-table-item>
          </ep-table>
        </div>
        <div class="block">
          <ep-pager right @size-change="handleSizeChange" @change="handleCurrentChange"
            :now-page="ep_page.offset" :page-size="ep_page.limit" :page-sizes="[5, 10, 20, 50, 100]" :total-num="totalcount"></ep-pager>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
  import misList from 'src/common/mislist'
  import { isArray, formatNumber } from 'utils'

  export default {
    name: 'invoiceCenter',

    extends: misList,

    created () {
      let status = this.$route.query.status
      undefined !== status && status != '-1'
        ? this.searchForm.status = status
        : null
      
      let billNo = this.$route.query.billNo
      billNo
       ? this.searchForm.billNo = billNo
       : null

      this.refresh(true)
    },

    methods: {
      showDetail (row, index, edit) {
        this.$router.push({
          path: 'input',
          query: { billNo: row.billNo, edit: edit }
        })
      },
      changeStatus (row, index, status) {
        this.$post('billStatus', {
          billNo: row.billNo,
          status: status
        }, true).then((json) => {
          row.status = status
        }).catch((e) => {})
      },
      formatPayableRmb (row) { return formatNumber(row.payableRmb) },
      formatPaidAmount (row) { return formatNumber(row.paidAmount) }
    },

    data () {
      return {
        loading: false,
        listApi: 'invoiceSearch',
        searchForm: {
          billNo: '',
          status: ''
        },
        label: [
          { value: '1', label: '拒绝入区' },
          { value: '2', label: '人工放行' },
          { value: '3', label: '需待审核' },
          { value: '4', label: '待补充数据，请补充完整' }
        ],
        totalcount: 0,
        ep_page: {
          limit: 10,
          offset: 1
        },
        ep_data: [],
        model: {
          show: false,
          edit: false,
          rows: [],
          result: {}
        }
      }
    }
  }
</script>