<template>
  <div>
    <div class="ep-card card-margin">
      <div class="card-title center">
        <span class="left weight">货物列表</span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-table ref="table" :data="ep_list" :height="300" @row-click="handleClick">
            <ep-table-item column="id" title="序号" width="240"></ep-table-item>
            <ep-table-item column="vessel" title="船名" width="480"></ep-table-item>
            <ep-table-item column="voyage" title="航次">></ep-table-item>
          </ep-table>
        </div>
      </div>
    </div>
    <div class="ep-card card-margin" style="margin-bottom: 0px" v-loading="loading">
      <div class="card-title center">
        <span class="left weight">货物信息</span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-form ref="form" :form="formCargo" name-width="120px">
            <ep-row>
              <ep-col :col="24">
                <ep-form-item label="货物描述" attr="cargoDesc">
                  <ep-input :readonly="edit" type="textarea" v-model="formCargo.cargoDesc"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label="货物描述补充" attr="additionInfo">
                  <ep-input :readonly="edit" v-model="formCargo.additionInfo"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label="唛头" attr="marks">
                  <ep-input :readonly="edit" v-model="formCargo.marks"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="货物件数" attr="packages">
                  <ep-input :readonly="edit" v-model="formCargo.packages"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="货毛重(千克)" attr="grossMass">
                  <ep-input :readonly="edit" v-model="formCargo.grossMass"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="货净重(千克)" attr="grossWeight">
                  <ep-input :readonly="edit" v-model="formCargo.grossWeight"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="货尺寸(立方米)" attr="grossVolume">
                  <ep-input :readonly="edit" v-model="formCargo.grossVolume"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="包装类型代码" attr="packTypeCode">
                  <ep-input :readonly="edit" v-model="formCargo.packTypeCode"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="包装类型" attr="packType">
                  <ep-input :readonly="edit" v-model="formCargo.packType"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="海关税则编号" attr="cmsTariffCode">
                  <ep-input :readonly="edit" v-model="formCargo.cmsTariffCode"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="原产地代码" attr="orignCountryCode">
                  <ep-input :readonly="edit" v-model="formCargo.orignCountryCode"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import { cloneObj } from 'utils'

  export default {

    props: {
      edit: Boolean
    },

    methods: {
      setData (list, data, bill) {
        this.ep_list = cloneObj(list)
        let formData = cloneObj(this.formCargo),
            billData = bill
        for (let item in data) {
          if (data.hasOwnProperty(item)) {
            formData[item] = data[item]
          }
        }
        for (let item in billData) {
          if (billData.hasOwnProperty(item)) {
            formData[item] = billData[item]
          }
        }
        this.formCargo = formData
      },
      handleClick (evt, row) {
        this.loading = true
        console.log(111)
        setTimeout(() => {
          this.loading = false
        }, 500)
      }
    },
    
    data () {
      return {
        loading: false,
        ep_list: [],
        formCargo: {
          cargoDesc: '',
          additionInfo: '',
          marks: '',
          packages: '',
          grossMass: '',
          grossWeight: '',
          grossVolume: '',
          packTypeCode: '',
          packType: '',
          cmsTariffCode: '',
          orignCountryCode: ''
        }
      }
    }
  }
</script>
