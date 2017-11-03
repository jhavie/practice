<template>
  <div class="ep-breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ep-breadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },
      icon: {
        type: String,
        default: ''
      }
    }
  };
</script>
