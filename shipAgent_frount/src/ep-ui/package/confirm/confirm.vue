<template>
  <model width="380px"
    v-model="model">
    <i :class="['ep-color-' + type, iconStyle]"></i><span>{{}}</span>
  </model>
</template>

<script>
  import model from '../model'

  const DEFAULT_ICON = {
    'info': 'information-circled',
    'success': 'checkmark-circled',
    'warning': 'alert-circled',
    'danger': 'close-circled'
  }
  
  export default {
    name: 'ep-confirm',

    computed: {
      iconStyle () {
        return `ion-${DEFAULT_ICON}`
      }
    },

    data () {
      return {
        title: '提示',
        type: 'warning',
        model: false,
        cancelCallback: null,
        successCallback: null
      }
    }
  }
</script>
