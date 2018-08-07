<template>
  <div>
    <mt-popup ref="popup"  pop-transition="popup-fade"  position="bottom" class="cui-attr-picker" v-model="visible">
      <mt-picker :slots="attrSlots"
                  @change="onAttrChange"
                  :value-key="valueKey" :visible-item-count="3" show-toolbar>
            <span class="cui-attr-picker-action cui-attr-picker-cancel"
                  @click.stop="close">{{ cancelText }}</span>
        <span class="cui-attr-picker-action cui-attr-picker-confirm"
              @click.stop="confirm">{{ confirmText }}</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<style>
  .cui-attr-picker {
    width: 100%;
  }
  .cui-attr-picker .picker-slot-wrapper, .cui-attr-picker .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .cui-attr-picker .picker-toolbar {
    border-bottom: solid 1px #eaeaea;
  }
  .cui-attr-picker-action {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 80px;
    font-size: 32px; /*px*/
    color: #26a2ff;
  }
  .cui-attr-picker-cancel {
    float: left;
  }
  .cui-attr-picker-confirm {
    float: right;
  }
</style>
<script>
  import Vue from 'vue'
  import Mint from 'mint-ui'
  import 'mint-ui/lib/style.css'
  Vue.use(Mint);
  export  default {
    name: 'cui-attr-picker',
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      listArr:{
        type:Array
      }
    },
    data: function() {
      return {
        visible: false,
        attrSlots: [{
          flex: 1,
          values:this.listArr
        }],
        valueKey: 'name',
        attr:"",
        attrCode:""
      };
    },

    methods: {
      onAttrChange: function (picker, value) {
        console.log(picker,value);
        this.attr = value[0].name;
        this.attrCode = value[0].code;
      },
      confirm: function(e) {
        this.close();
        this.$emit('confirm', this.attr,this.attrCode);
      },

      open: function(e) {
        this.$refs['popup'].currentValue = true;
        this.visible = true;
      },

      close: function() {
        this.$refs['popup'].currentValue = false;
        this.visible = false;
      }
    }
  }
</script>
