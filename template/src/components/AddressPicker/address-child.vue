
<template>
  <div ref="popup"
       v-show="visibleFlag">
    <div class="mask" @click="_hideLinkage"></div>
    <div class="clearfix linkAddress" >
      <div class="toolbar">
        <span class="cui-attr-picker-action cui-attr-picker-cancel"
                   @click.stop="close">{{ cancelText }}</span>
        <span class="cui-attr-picker-action cui-attr-picker-confirm"
              @click.stop="confirm">{{ confirmText }}</span>
      </div>
      <div class="province pickerWrapper" >
        <mt-picker :slots="provinces"
                   value-key="name"
                   @change="onProvinceChange"></mt-picker>
      </div>
      <div class="city pickerWrapper" >
        <mt-picker :slots="citys"
                   value-key="name"
                   @change="onCityChange"></mt-picker>
      </div>
      <div class="area pickerWrapper" >
        <mt-picker :slots="areas"
                   value-key="name"
                   @change="onAreaChange"></mt-picker>
      </div>
   </div>
  </div>
</template>

<script>
  import {CITY_DATA} from './cityData'  //引入cityData数据

  export default {
    name: 'address-child',
    computed: {
      result() {
          let province={},city={},area={};
          if(this.province){
            province =this.province;
          }
          if(this.city){
            city = this.city;
          }
          if(this.area){
            area = this.area
          }
          return {
            province:province,
            city:city,
            area:area
          }
      }
    },
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      cover:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        visibleFlag: false,
        attr:"",
        attrCode:"",
        province:{
          name:'上海市',
          code:'310000'
        },
        city:{
          name:'市辖区',
          code:'310100'
        },
        area:{
          name:'黄浦区',
          code:'310101'
        },
        flag:0, //最开始省市区那三个picker会初始化调用change事件，但是此时没有省市区数据，因此会报错，
                //所以以这个标识符来控制当时第一次初始化时调用change事件时直接return
        provinces: [
          {
            flex: 1,
            values: this._getProvince(),
            className: 'slot1',
            textAlign: 'center'
          },
          {
             divider: true,
             content: '-',
             className: 'right'
           }
        ],
        citys: [
          {
            flex: 1,
            values: this._getCity('上海市'),
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          }
        ],
        areas: [
          {
            flex: 1,
            values: this._getArea('上海市','市辖区'),
            className: 'slot1',
            textAlign: 'center'
          }
        ]

      };
    },
    methods:{
      onAttrChange: function (picker, value) {
        this.attr = value[0].name;
        this.attrCode = value[0].code;
      },
      _hideLinkage(){
        this.$emit('getLinkAddress',this.result); //触发父组件的getLinkage事件接收结果数据
      },
      onProvinceChange(picker, values) {
        if(this.flag===0){
          return
        }
        let provinceIndex=picker.getSlotValue(0)
        this.province=provinceIndex;
        console.log('provinceIndex.name--->',provinceIndex.name)

          let city=this._getCity(provinceIndex.name)

        //特别处理港澳台地区
        if(provinceIndex.code === '710000'
          ||provinceIndex.code === '810000'
          ||provinceIndex.code === '910000' ){
          this.citys[0].values='';
          this.city={};
          this.areas[0].values='';
          this.area={};
          this.provinces[1].divider =false;
          this.citys[1].divider =false;
        }else{
          this.citys[0].values=city;
          this.city=city[0]
          this.provinces[1].divider =true;
          this.citys[1].divider =true;
        }
      },
      onCityChange(picker, values) {
        if(this.flag===0){
          return
        }
        let cityIndex=picker.getSlotValue(0)
        this.city=cityIndex
        let provinceIndex=this.province;
        console.log('onCityChange picker---->',picker)
        if(cityIndex){
          let area=this._getArea(provinceIndex.name,cityIndex.name);
          this.areas[0].values=area
          this.area=area[0]
        }
      },
      onAreaChange(picker, values) {
        if(this.flag===0){
          this.flag=1
          return
        }
        let areaIndex=picker.getSlotValue(0)
        this.area=areaIndex
      },
      //得到省份数据
      _getProvince(){
        let province=[];
        let ths = this;
        CITY_DATA.forEach(function(item,index){
          let obj={}
          if(item.code === ths.cover.code){
            obj.code=item.code;
            obj.name=item.name;
            province.push(obj)
          }
          if(!ths.cover.code){
            obj.code=item.code;
            obj.name=item.name;
            province.push(obj)
          }
        })
        console.log('province---',province)
        return province
      },
      //根据省份得到城市数据
      _getCity(province){
        let city=[]
        CITY_DATA.forEach((item,index)=>{
          if(item.name === province && item.children){
            item.children.forEach((item,index)=>{
              let obj={}
              obj.code=item.code
              obj.name=item.name
              city.push(obj)
              return
            })
          }
        });
        console.log('-----city',city)
        return city
      },
      //根据城市和省份得到区域数据
      _getArea(province,city){
        let area=[]
        CITY_DATA.forEach((item,index)=>{
          if(item.name === province){
            item.children.forEach((item,index)=>{
              if(item.name === city){
                item.children.forEach((item)=>{
                  let obj={}
                  obj.code=item.code
                  obj.name=item.name
                  area.push(obj)
                  return
                })
              }
            })
          }
        })
        if(area.length==0){ //如果没有区域数据则第三个picker显示的内容
          area.push({
            name:'没有',
            code:'000000'
          })
        }
        return area
      },

      confirm() {
        this.close();
        this._hideLinkage();
      },
     /* open() {
        this.$refs['popup'].isShow = true;
        this.visibleFlag = true;
      },*/
      close() {
        this.$emit('getLinkAddress');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mask{
    position: fixed;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    z-index:197
  }
  .linkAddress{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    left: 0;
    overflow: hidden;
    z-index: 198;
  }
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .pickerWrapper{
    width:33.3%;
    float: left;
  }
 /* .cui-address-picker-action {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 80px;
    font-size: 32px; !*px*!
    color: #26a2ff;
  }
  .cui-address-picker-cancel {
    float: left;
  }
  .cui-address-picker-confirm {
    float: right;
  }*/
</style>
