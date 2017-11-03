<template>
  <div class="ep-radio-group">
    <slot></slot>
  </div>
</template>
<script>
  import emitter from './../../src/mixins/emitter';

  export default {
    name: 'ep-radio-group',

    mixins: [emitter],

    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean,
      vertical: {
                type: Boolean,
                default: false
            }
    },
    watch: {
      value(value) {
        this.$emit('change', value);
        this.dispatch('ep-form-item', 'ep.form.change', [this.value]);
      }
    }
  };
</script>

