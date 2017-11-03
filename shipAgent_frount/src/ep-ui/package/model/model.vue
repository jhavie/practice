<template>
  <transition name="ep-model-fade">
    <div class="ep-model-wrapper" v-show="value"
      @click.self="off">
      <div class="ep-model"
        :class="['ep-model-' + size, middle? 'ep-model-middle':'' ]"
        :style="{ width: width }">
        <div class="ep-model-close" @click="off" v-if="closeable">
          <i class="ion-close-round"></i>
        </div>
        <div class="ep-model-header">
          <span>{{ title }}</span>
          <slot name="header"></slot>
        </div>
        <div class="ep-model-body"
          :class="height? 'ep-model-height': ''" :style="{ height: height }" v-if="$slots.default">
          <slot></slot>
        </div>
        <div class="ep-model-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <slot name="expand"></slot>
    </div>
  </transition>
</template>

<script>
  import { on, off, addClass, removeClass } from "../../src/utils/dom"

  export default {
    name: 'ep-model',

    props: {
      title: String,
      width: String,
      height: String,
      closeable: {
        type: Boolean,
        default: true
      },
      value: Boolean,
      middle: Boolean,
      size: {
        type: String,
        default: 'normal'
      }
    },

    watch: {
      value (val) {
        if (val) {
          on (window, 'keydown', this.esc)
          addClass(document.body, 'ep-clearfix')
          this.$emit('open')
        } else {
          off (window, 'keydown', this.esc)
          removeClass(document.body, 'ep-clearfix')
          this.$emit('close')
        }
      }
    },

    data () {
      return {

      }
    },

    methods: {
      esc (evt) {
        if (evt.keyCode === 27) {
          this.off()
        }
      },
      off () {
        this.$emit('input', !this.value)
      }
    }
  }
</script>