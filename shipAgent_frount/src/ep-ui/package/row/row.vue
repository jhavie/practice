<template>
  <div
    class="ep-row"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'EpRow',
    props: {
      gutter: [Number, Object],
      type: String,
    }
  };
</script>