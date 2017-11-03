<template>
  <div class="ep-badge">
    <slot></slot>
    <transition name="ep-zoom-in-center">
      <sup
        v-show="!hidden && content"
        v-text="content"
        class="ep-badge__content"
        :class="{ 'is-fixed': $slots.default, 'is-dot': isDot }">
      </sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ep-badge',

  props: {
    value: {},
    max: Number,
    isDot: Boolean,
    hidden: Boolean
  },

  computed: {
    content() {
      if (this.isDot) return ' ';

      const value = this.value;
      const max = this.max;

      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }

      return value;
    }
  }
};
</script>
