<template>
  <div :class="[
    type === 'textarea' ? 'ep-textarea' : 'ep-input',
    size ? 'ep-input--' + size : '',
    {
      'is-disabled': disabled,  
      'ep-input-group': $slots.prepend || $slots.append,
      'ep-input-group--append': $slots.append,
      'ep-input-group--prepend': $slots.prepend
    }
    ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="ep-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- input 图标 -->
      <slot name="icon">
        <i class="ep-input__icon"
          :class="[
            'ion-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
          v-if="icon"
          @click="handleIconClick">
        </i>
      </slot>
      <input
        v-if="type !== 'textarea'"
        class="ep-input__inner"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autoComplete"
        :autofocus="autofocus"
        :min="min"
        :max="max"
        :step="step"
        :form="form"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <svg class="spinner" v-if="validating" width="15px" height="15px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:#FFF"></circle>
      </svg>
      <!-- 后置元素 -->
      <div class="ep-input-group__append" v-if="$slots.append">
          <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="ep-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="textareaStyle"
      :readonly="readonly"
      :rows="rows"
      :form="form"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :minlength="minlength"
      @focus="handleFocus"
      @blur="handleBlur">
    </textarea>
  </div>
</template>

<script>
  import emitter from './../../src/mixins/emitter'
  import calcTextareaHeight from './calcTextareaHeight'
  import merge from './../../src/merge'

  export default {
    name: 'ep-input',

    componentName: 'ep-input',

    mixins: [ emitter ],

    data () {
      return {
        currentValue: this.value,
        textareaCalcStyle: {}
      }
    },
    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      readonly: Boolean,
      autofocus: Boolean,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      onIconClick: Function
    },

    watch: {
      value (val, oldVal) {
        this.setCurrentValue(val, oldVal)
      }
    },

    computed: {
      validating () {
        return this.$parent.validateState === 'validating'
      },
      textareaStyle () {
        return merge({}, this.textareaCalcStyle, { resize: this.resize })
      }
    },

    methods: {
      handleBlur (event) {
        this.$emit('blur', event)
        if (this.validateEvent) {
          this.dispatch('ep-form-item', 'ep.form.blur', [this.currentValue])
        }
      },
      inputSelect () {
        this.$refs.input.select()
      },
      resizeTextarea () {
        if (this.$isServer) return
        var { autosize, type } = this
        if (!autosize || type !== 'textarea') return
        const minRows = autosize.minRows
        const maxRows = autosize.maxRows

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
      },
      handleFocus (event) {
        this.$emit('focus', event)
        this.dispatch('ep-form-item', 'ep.form.focus')
      },
      handleInput (event) {
        this.setCurrentValue(event.target.value)
      },
      handleIconClick (event) {
        if (this.onIconClick) {
          this.onIconClick(event)
        }
        this.$emit('click', event)
      },
      setCurrentValue (value) {
        if (value === this.currentValue) return
        this.$nextTick(_ => {
          this.resizeTextarea()
        })
        this.currentValue = value
        this.$emit('input', value)
        this.$emit('change', value)
        if (this.validateEvent) {
          this.dispatch('ep-form-item', 'ep.form.change', [value])
        }
      }
    },

    created () {
      this.$on('inputSelect', this.inputSelect)
      if (this.currentValue !== undefined && this.maxlength !== undefined && this.maxlength !== 0) {
        setTimeout(() => {
          this.dispatch('ep-form-item', 'ep.form.init', [ this.currentValue.length, this.maxlength ])
        }, 0)
      }
    },

    mounted () {
      this.resizeTextarea()
    }
  }
</script>
