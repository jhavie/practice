<template>
  <div class="login-ipt">
    <label class="login-transition login-label" :style="{ color: activeColor }">{{label}}</label>
    <div class="login-ipt-content">
      <input class="login-transition login-ipt" :style="{ borderColor: activeColor }"
        @input="handleInput" :type="type" @focus="onFocus" @blur="onBlur" @keyup.enter="onEnter">
    </div>
    <template v-if="required && isError">
      <span class="login-error">请填写{{ label }}</span>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'login-btn',
    props: {
      value: [String, Number],
      type: String,
      label: String,
      required: Boolean
    },
    data () {
      return {
        activeColor: null,
        isError: false
      } 
    },
    methods: {
      onFocus () {
        if (!this.isError) {
          this.activeColor = '#2196f3'
        }
      },
      onBlur () {
        if (this.value === '') {
          this.isError = true
        } else {
          this.activeColor = null
          this.isError = false
        }
      },
      onEnter () {
        this.$emit('enter')
      },
      handleInput (evt) {
        this.$emit('input', evt.target.value)
      }
    },
    watch: {
      isError (val) {
        if (val) {
          this.activeColor = 'red'
        } else {
          this.activeColor = null
        }
      }
    }
  }
</script>

<style>
  .login-ipt {
    position: relative;
  }
  .login-ipt-content {
    padding-bottom: 25px
  }
  .login-label {
    font-size: 14px;
    padding-left: 5px
  }
  .login-ipt input {
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 2px solid #CCC;
    display: block;
    padding: 0 5px;
    margin: 0;
    width: 100%;
    height: 32px;
    color: rgba(0,0,0,.87);
    font-size: 16px;
    position: relative
  }
  .login-transition {
    -webkit-transition: all .3s cubic-bezier(.23,1,.32,1);
    transition: all .3s cubic-bezier(.23,1,.32,1)
  }
  .login-error {
    color: red;
    position: absolute;
    padding-left: 5px;
    bottom: 5px;
    font-size: 12px
  }
</style>