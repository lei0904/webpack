<template>
  <div class="index">
    <span>{{msg}}</span>
    <mt-field label="本市地区" placeholder="请选择本市地区"
              v-model="form.nowAddress"
              @click.native="changeNowCity"
              :disabled=true>
    </mt-field>

    <mt-field label="本市地区" placeholder="请选择本市地区"
              v-model="form.address"
              @click.native="changeCity"
              :disabled=true>
    </mt-field>

    <cui-address-child
      ref="nowAddressPicker"
      :cover=coverProvice
      @getLinkAddress='nowHandleChange'
      v-show="showNowAddress"></cui-address-child>

    <cui-address-child
      ref="nowAddressPicker"

      :cover={}
      @getLinkAddress='handleChange'
      v-show="showAddress"></cui-address-child>
  </div>
</template>
<script>
  export default {
    name:'index',
    data (){
      return {
        msg:'Welcome myself vue  project',
        showNowAddress:false,
        showAddress:false,
        form:{
          nowAddress:'',
          address:''
        },
        coverProvice:{
          "code": "310000",
          "name": "上海市",
        }
      }
    },
    methods:{
      changeNowCity (){
        this.showNowAddress = true;
      },
      nowHandleChange (picker){
        console.log('nowHandleChange-----',picker)
        if(picker){
          if(picker.province){
            this.form.nowProvince = picker.province.code;
          }
          if(picker.city){
            this.form.nowCity = picker.city.code;
          }
          if(picker.area){
            this.form.nowArea = picker.area.code;
          }
          this.form.nowAddress = picker.province.name +"-"+picker.city.name+"-"+picker.area.name
        }
        this.showNowAddress = false;
      },
      changeCity (){
        this.showAddress = true;
      },
      handleChange (picker){
        console.log('handleChange-----',picker)
        if(picker){
          if(picker.province){
            this.form.province = picker.province.code;
          }
          if(picker.city){
            this.form.city = picker.city.code;
          }
          if(picker.area){
            this.form.area = picker.area.code;
          }
          this.form.address = picker.province.name +"-"+picker.city.name+"-"+picker.area.name
        }
        this.showAddress = false;
      }
    }
  }
</script>
<style lang="scss">
  .index{
  }
</style>
