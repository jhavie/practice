<template>
  <label class="ep-radio" :class="verticalClass">
    <span class="ep-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
        'is-focus': focus
      }"
    >
      <span class="ep-radio__inner"></span>
      <input
        class="ep-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        :name="name"
        :disabled="isDisabled">
    </span>
    <span class="ep-radio__label" :class="{ 'is-checked': model === label }">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import emitter from './../../src/mixins/emitter';

  export default {
    name: 'ep-radio',

    mixins: [emitter],

    componentName: 'EpRadio',

    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String
    },

    data() {
      return {
        focus: false,
        _radioGroup:{}
      };
    },

    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options._componentTag !== 'ep-radio-group') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      verticalClass() {
        if(this.$parent.vertical !== false && typeof this.$parent.vertical !== 'undefined'){
          return 'ep-radio-vertical';
        }

      },

      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },

        set(val) {
          if (this.isGroup) {
            this.dispatch('ep-radio-group', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
      },

      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
      }
    },
    mounted() {

    }
  };
</script>
