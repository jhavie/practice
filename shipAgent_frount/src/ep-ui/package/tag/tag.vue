<template>
  <transition :name="closeTransition ? '' : 'ep-zoom-in-center'">
    <span
      class="ep-tag"
      :class="[type ? 'ep-tag--' + type : '', {'is-hit': hit}]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="ep-icon-close fa fa-times"
        v-if="closable"
        @click="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'ep-tag',
    props: {
      index: Number,
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      closeTransition: Boolean,
      color: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', this.index);
      }
    }
  };
</script>
