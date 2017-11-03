<template>
  <div style="padding-bottom: 10px" v-loading="loading">
    <!--步骤条-->
    <div class="ep-card card-margin" v-show="!edit">
      <div class="card-title center">
        <span class="left weight">进口舱单录入</span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-steps :active="active" finish-status="success" center>
            <ep-step title="录入提单信息"></ep-step>
            <ep-step title="录入收发货人信息"></ep-step>
            <ep-step title="录入货物信息"></ep-step>
          </ep-steps>
        </div>
        <br/>
        <div class="block center">
          <ep-button-group>
            <ep-button size="small" type="primary" :disabled="active === 0 || active === 3" @click="prev">上一步</ep-button>
            <ep-button size="small" type="info" :disabled="active === 2 || active === 3" @click="next">下一步</ep-button>
            <ep-button size="small" type="success" :disabled="active !== 2" @click="save">保存</ep-button>
          </ep-button-group>
        </div>
      </div>
    </div>
    <!-- 提单信息 -->
    <bill v-show="active === 0 || edit" :edit="edit" ref="formBill"></bill>
    <!-- 收发货人信息 -->
    <people v-show="active === 1 || edit" :edit="edit" ref="formPeople"></people>
    <!-- 货物信息 -->
    <cargo v-show="active === 2 || edit" :edit="edit" ref="formCargo"></cargo>
    
    <div v-show="active === 3" class="ep-card card-margin">
      <div class="card-body">
        <ep-alert title="录入成功" description="3秒后自动跳转到审单页面" type="success" show-icon></ep-alert>
      </div>
    </div>

    <!-- 提单信息 -->
    <!-- <bill></bill> -->
    <!-- 收发货人信息 -->
    <!-- <people></people> -->
    <!-- 货物信息 -->
    <!-- <cargo></cargo> -->
  </div> 
</template>

<script>
  import { objIsEmpty, isArray, formatNumber } from 'utils'
  import bill from './input/bill'
  import people from './input/people'
  import cargo from './input/cargo'

  export default {

    name: 'invoiceInput',

    components: { bill, people, cargo },

    props: {
      isEdit: Boolean
    },

    created () {
      let query = this.$route.query
      if (query.billNo && undefined !== query.edit) {
        this.edit  = query.edit === '1'? true: false
        let billNo = query.billNo
        this.setData(billNo)
      }

      if (this.isEdit) {
        this.edit = true
      }
    },

    methods: {
      prev () {
        if (this.active > 0) this.active -= 1
      },
      next() {
        if (this.active++ > 2) this.active = 0
      },
      save () {
        this.active++
        this.$pop({
          type: 'success',
          message: '录入成功'
        })
        this.$router.push('/search')
      },
      setData (billNo) {
        this.loading = true
        this.$post('getDataByBillNo', {
          billNo: billNo
        }).then((json) => {
          this.loading = false
          // console.log(json)
          let data        = json.data,
              cargo       = data.Cargo,
              $i          = -1,
              cargoDetail = {}
          
          if (objIsEmpty(data))
            return

          cargo.every((item, index) => {
            if (item.cargoDesc) {
              $i = index
              return false
            }
            return true
          })
          if ($i !== -1) {
            cargoDetail = cargo[$i]
            // cargo.splice($i, 1)
          }

          this.$refs['formBill'].setData(data.bill)
          this.$refs['formPeople'].setData(data.PInfo)
          this.$refs['formCargo'].setData(cargo, cargoDetail, data.bill)
        }).catch((e) => {
          this.loading = false
          console.error(e)
        })
      }
    },

    data () {
      return {
        loading: false,
        edit: false,
        active: 0
      }
    }
  }
</script>