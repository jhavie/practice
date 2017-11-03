<template>
  <div>
    <div class="ep-card card-margin">
      <div class="card-title center">
        <span class="left weight">发货人信息</span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-form ref="formBill" :form="formBill" name-width="100px">
            <ep-row>
              <ep-col :col="8">
                <ep-form-item label="发货人代码" attr="code">
                  <ep-input :readonly="edit" v-model="formBill.code"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="发货人名称" attr="name">
                  <ep-input :readonly="edit" v-model="formBill.name"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label="发货地址" attr="addLine">
                  <ep-input :readonly="edit" v-model="formBill.addLine"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="国家" attr="addCountryCode">
                  <ep-input :readonly="edit" v-model="formBill.addCountryCode"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="省份代码" attr="addCountrySubEntityId">
                  <ep-input :readonly="edit" v-model="formBill.addCountrySubEntityId"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="省份名称" attr="addCountrySubEntityName">
                  <ep-input :readonly="edit" v-model="formBill.addCountrySubEntityName"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="城市" attr="addCityname">
                  <ep-input :readonly="edit" v-model="formBill.addCityname"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="邮政编码" attr="addPostcodeId">
                  <ep-input :readonly="edit" v-model="formBill.addPostcodeId"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8"><ep-form-item></ep-form-item></ep-col>
              <ep-col :col="8">
                <ep-form-item label="电话" attr="comTel">
                  <ep-input :readonly="edit" v-model="formBill.comTel"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="EMail" attr="comEm">
                  <ep-input :readonly="edit" v-model="formBill.comEm"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="传真" attr="comFx">
                  <ep-input :readonly="edit" v-model="formBill.comFx"></ep-input>
                </ep-form-item>
              </ep-col>
            </ep-row>
          </ep-form>
        </div>
      </div>
    </div>
    <div class="ep-card card-margin">
      <div class="card-title center">
        <span class="left weight">收货人信息</span>
      </div>
      <div class="card-body">
        <div class="block">
          <ep-form ref="toBill" :form="toBill" name-width="120px">
            <ep-row>
              <ep-col :col="8">
                <ep-form-item label="收货人代码" attr="code">
                  <ep-input  :readonly="edit" v-model="toBill.code"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="16">
                <ep-form-item label="收货人名称" attr="name">
                  <ep-input  :readonly="edit" v-model="toBill.name"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="24">
                <ep-form-item label="收货地址" attr="addLine">
                  <ep-input  :readonly="edit" v-model="toBill.addLine"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="国家" attr="addCountryCode">
                  <ep-input  :readonly="edit" v-model="toBill.addCountryCode"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="省份代码" attr="addCountrySubEntityId">
                  <ep-input  :readonly="edit" v-model="toBill.addCountrySubEntityId"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="省份名称" attr="addCountrySubEntityName">
                  <ep-input  :readonly="edit" v-model="toBill.addCountrySubEntityName"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="城市" attr="addCityname">
                  <ep-input  :readonly="edit" v-model="toBill.addCityname"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="邮政编码" attr="addPostcodeId">
                  <ep-input  :readonly="edit" v-model="toBill.addPostcodeId"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8"><ep-form-item></ep-form-item></ep-col>
              <ep-col :col="8">
                <ep-form-item label="电话" attr="comTel">
                  <ep-input  :readonly="edit" v-model="toBill.comTel"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="EMail" attr="comEm">
                  <ep-input  :readonly="edit" v-model="toBill.comEm"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="传真" attr="comFx">
                  <ep-input  :readonly="edit" v-model="toBill.comFx"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="具体联系人名称" attr="contactName">
                  <ep-input  :readonly="edit" v-model="toBill.contactName"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="12">
                <ep-form-item>
                  <font color="#E74C3C">填写收货人具体联系人名称后必填一项联系方式</font>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="具体联系人电话" attr="contactTel">
                  <ep-input  :readonly="edit" v-model="toBill.contactTel"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="具体联系人EMail" attr="contactEm">
                  <ep-input  :readonly="edit" v-model="toBill.contactEm"></ep-input>
                </ep-form-item>
              </ep-col>
              <ep-col :col="8">
                <ep-form-item label="具体联系人传真" attr="contactFx">
                  <ep-input  :readonly="edit" v-model="toBill.contactFx"></ep-input>
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
      setData (data) {
        this.$refs.toBill.reset()
        this.$refs.formBill.reset()
        console.log('people',data)
        let billData = data
        let formData = cloneObj(this.formBill)
        let toData = cloneObj(this.toBill)
        for (let item in billData) {
          if(billData[item].type === 'CONSIGNOR'){
            let formDataBill = billData[item];
            for(let formItem in formDataBill){
              if (formDataBill.hasOwnProperty(formItem)) {
                formData[formItem] = formDataBill[formItem]
              }
            }
          }
          if(billData[item].type === 'CONSIGEE'){
            let toDataBill = billData[item];
            for(let toItem in toDataBill){
              if (toDataBill.hasOwnProperty(toItem)) {
                toData[toItem] = toDataBill[toItem]
              }
            }
          }
        }
        this.formBill = formData
        this.toBill = toData
      }
    },

    data () {
      return {
        formBill: {
          code: '',
          name: '',
          addLine: '',
          addCountryCode: '',
          addCountrySubEntityId: '',
          addCountrySubEntityName: '',
          addCityname: '',
          addPostcodeId: '',
          comTel: '',
          comEm: '',
          comFx: ''
        },
        toBill:{
          code: '',
          name: '',
          addLine: '',
          addCountryCode: '',
          addCountrySubEntityId: '',
          addCountrySubEntityName: '',
          addCityname: '',
          addPostcodeId: '',
          comTel: '',
          comEm: '',
          comFx: '',
          contactName: '',
          contactTel: '',
          contactEm: '',
          contactFx: ''
        }
      }
    }
  }
</script>
