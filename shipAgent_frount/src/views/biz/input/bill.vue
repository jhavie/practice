<template>
  <ep-row style="margin: 0px">
    <ep-col :col="9">
      <div class="ep-card card-margin" style="height: 480px">
        <div class="card-title center">
          <span class="left weight">提单信息</span>
        </div>
        <div class="card-body">
          <div class="block">
            <ep-form ref="formBill" :form="formBill" name-width="100px">
              <ep-form-item label="IMO编号" attr="imoNo">
                <ep-input :readonly="edit" v-model="formBill.imoNo"></ep-input>
              </ep-form-item>
              <ep-form-item label="英文船名" attr="vessel">
                <ep-input :readonly="edit" v-model="formBill.vessel"></ep-input>
              </ep-form-item>
              <ep-form-item label="航次" attr="voyage">
                <ep-input :readonly="edit" v-model="formBill.voyage"></ep-input>
              </ep-form-item>
              <ep-form-item label="总提运单号" attr="masterBillNo">
                <ep-input :readonly="edit" v-model="formBill.masterBillNo"></ep-input>
              </ep-form-item>
              <ep-form-item label="装船时间" attr="loadDate">
                <ep-input :readonly="edit" v-model="formBill.loadDate"></ep-input>
              </ep-form-item>
              <ep-form-item label="装货港代码" attr="loadCode">
                <ep-input :readonly="edit" v-model="formBill.loadCode"></ep-input>
              </ep-form-item>
              <ep-form-item label="装货港名称" attr="loadName">
                <ep-input :readonly="edit" v-model="formBill.loadName"></ep-input>
              </ep-form-item>
            </ep-form>
          </div>
        </div>
      </div>
    </ep-col>
    <ep-col :col="15">
      <div class="ep-card card-margin">
        <div class="card-title center">
          <span class="left weight">地点信息</span>
        </div>
        <div class="card-body">
          <div class="block">
            <ep-form ref="form" :form="formBill" name-width="120px">
              <ep-row>
                <ep-col :col="12">
                  <ep-form-item label="卸货地关区" attr="unloadCode">
                    <ep-input :readonly="edit" v-model="formBill.unloadCode"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="到达卸货地日期" attr="unloadDate">
                    <ep-input :readonly="edit" v-model="formBill.unloadDate"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="中转标志" attr="trnPlaceCode">
                    <ep-input :readonly="edit" v-model="formBill.trnPlaceCode"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="中转目的地" attr="trnPlaceArea">
                    <ep-input :readonly="edit" v-model="formBill.trnPlaceArea"></ep-input>
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          </div>
        </div>
      </div>
      <div class="ep-card card-margin">
        <div class="card-title center">
          <span class="left weight">货物交付目的地信息</span>
        </div>
        <div class="card-body">
          <div class="block">
            <ep-form ref="form" :form="formBill" name-width="120px">
              <ep-row>
                <ep-col :col="24">
                  <ep-form-item label="目的地地址" attr="destinationCode">
                    <ep-input :readonly="edit" v-model="formBill.destinationCode"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="国家" attr="area">
                    <ep-input :readonly="edit" v-model="formBill.area"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="省份代码" attr="area">
                    <ep-input :readonly="edit" v-model="formBill.area"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="省份名称" attr="area">
                    <ep-input :readonly="edit" v-model="formBill.area"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="城市" attr="area">
                    <ep-input :readonly="edit" v-model="formBill.area"></ep-input>
                  </ep-form-item>
                </ep-col>
                <ep-col :col="12">
                  <ep-form-item label="邮政编码" attr="area">
                    <ep-input :readonly="edit" v-model="formBill.area"></ep-input>
                  </ep-form-item>
                </ep-col>
              </ep-row>
            </ep-form>
          </div>
        </div>
      </div>
    </ep-col>
  </ep-row>
</template>

<script>
  import { cloneObj } from 'utils'
  const form = {
    // 无字段参数暂时挂载位置
    area: '',

    imoNo: '',
    vessel: '',
    voyage: '',
    masterBillNo: '',
    loadDate: '',
    loadCode: '',
    loadName: '',
    unloadCode: '',
    unloadDate: '',
    trnPlaceCode: '',
    trnPlaceArea: '',
    destinationCode: ''
  }
  
  export default {

    props: {
      edit: Boolean
    },

    methods: {
      setData (data) {
        this.$refs.formBill.reset()
        console.log(data)
        let billData = data
        let formData = cloneObj(this.formBill)
        for (let item in billData) {
          if (billData.hasOwnProperty(item)) {
            formData[item] = billData[item]
          }
        }
        this.formBill = formData
      }
    },

    data () {
      return {
        formBill: cloneObj(form)
      }
    }
  }
</script>
