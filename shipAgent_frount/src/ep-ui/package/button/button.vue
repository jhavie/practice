<template>
    <button :disabled="disabled" class="ep-button"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
          type ? 'ep-button--' + type : '',
          size ? 'ep-button--' + size : '',
          {
              'is-disabled': disabled,
              'is-loading': loading,
              'is-plain': plain
          }
        ]"
        v-wave="{ 'color': rippleColor }"
        @click="$emit('click')"
    >
        <svg class="ep-button-loading" v-if="loading" width="13px" height="13px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:#FFF"></circle>
        </svg>
        <i :class="' ion-' + icon" v-if="icon && !rightIcon && !loading"></i>
        <span v-if="$slots.default"><slot></slot></span>
        <i :class="' ion-' + icon" v-if="icon && rightIcon && !loading"></i>
    </button>
</template>
<script>
    export default{
      name: 'ep-button',

      props: {
        type: {
          type: String,
          default: 'default'
        },
        size: String,
        icon: {
          type: String,
          default: ''
        },
        nativeType: {
          type: String,
          default: 'button'
        },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        rightIcon: Boolean
      },

      computed: {
        rippleColor () {
          if (this.type === 'default' || this.type === 'text' || this.plain) {
            return 'dark'
          }
          return 'white'
        }
      }

    }
</script>
