<template>
  
  <label class="ep-switch" :class="{ 'is-disabled': disabled, 'ep-switch--wide': hasText }">
    <div class="ep-switch__mask" v-show="disabled"></div>
    <input
      class="ep-switch__input"
      type="checkbox"
      @change="handleChange"
      v-model="_value"
      :name="name"
      :disabled="disabled">
    <!--<transition name="ep-material-inside-fade">
      <span v-if="clickNow" class="ep-material-animation" :style="fadeStyle"></span>
    </transition>-->
      <!--<span class="ep-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
          <transition name="ep-material-inside-fade">
            <span class="ep-switch__button" :style="buttonStyle"></span>
          </transition>
      </span>-->
      <div class="ep-switch-all" :style="{ 'width': coreWidth + 'px' }">
        <div class="ep-switch-stick" ref="epSwitchStick"></div>
        <div class="ep-switch-circle" ref="epSwitchCircle">
          <div class="ep-switch-circle-div1">
            <transition name="ep-material-inside-fade">
              <span v-if="clickNow" class="ep-material-animation" :style="fadeStyle"></span>
            </transition>
          </div>
          <div class="ep-switch-circle-div2"></div>
        </div>
      </div>
    <transition name="label-fade">
      <div
        class="ep-switch__label ep-switch__label--left"
        v-show="value"
        :style="{ 'width': coreWidth + 'px' }">
        <i :class="[onIconClass]" v-if="onIconClass"></i>
        <span v-if="!onIconClass && onText">{{ onText }}</span>
      </div>
    </transition>
    <transition name="label-fade">
      <div
        class="ep-switch__label ep-switch__label--right"
        v-show="!value"
        :style="{ 'width': coreWidth + 'px' }">
        <i :class="[offIconClass]" v-if="offIconClass"></i>
        <span v-if="!offIconClass && offText">{{ offText }}</span>
      </div>
    </transition>
  </label>
</template>

<script>
import ripple from "./../../src/mixins/material";

  export default {
    name: 'ep-switch',

    mixins: [ripple],

    props: {
      value: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0
      },
      onIconClass: {
        type: String,
        default: ''
      },
      offIconClass: {
        type: String,
        default: ''
      },
      onText: {
        type: String,
        default: ''
      },
      offText: {
        type: String,
        default: ''
      },
      onColor: {
        type: String,
        default: ''
      },
      offColor: {
        type: String,
        default: 'rgb(189, 189, 189)'
      },
      buttonOnColor: {
        type: String,
        default: ''
      },
      buttonOffColor: {
        type: String,
        default: 'rgb(245, 245, 245)'
      },
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        coreWidth: this.width
      };
    },
    computed: {
      hasText() {
        /* istanbul ignore next */
        return this.onText || this.offText;
      },
      _value: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    watch: {
      value() {
        this.ripple;
        if (this.onColor || this.offColor) {
          this.setBackgroundColor();
        }
        this.handleButtonTransform();
      }
    },
    methods: {
      handleChange(event) {
        this.$emit('change', event.currentTarget.checked);
      },
      handleButtonTransform() {
        this.$refs.epSwitchCircle.style.left = this.value ? '100%' : '0px';
        this.$refs.epSwitchCircle.style.marginLeft =  this.value ? '-20px' : '0px';
      },
      setBackgroundColor() {
        let newColor = this.value ? this.onColor : this.offColor;
        this.$refs.epSwitchStick.style.borderColor = newColor;
        this.$refs.epSwitchStick.style.backgroundColor = newColor;
        let newButtonColor = this.value ? this.buttonOnColor : this.buttonOffColor;
        this.$refs.epSwitchCircle.style.backgroundColor = newButtonColor;
      },
      strlen(str) { //JS 判断中英文字符长度
          str = str + '';
          var len = 0;
              for (var i = 0; i < str.length; i++) {
                  var c = str.charCodeAt(i);
                  //单字节加1 
                  if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                      len++;
                  } else {
                      len += 2;
                  }
              }
          return len;
      }
    },
    mounted() {
      this.rippleNeedBindEvent = false;
      this.rippleStyle = "middle";
      /* istanbul ignore if */
      if (this.width === 0) {
        if(this.strlen(this.onText) > this.strlen(this.offText)){
            this.coreWidth = 38 + this.strlen(this.onText) * 4;
        }
        else{
            this.coreWidth = 38 + this.strlen(this.offText) * 4;
        }
        
      }
      this.handleButtonTransform();
      if (this.onColor || this.offColor) {
        this.setBackgroundColor();
      }
    }
  };
</script>

