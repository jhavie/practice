<template>
  <li class="ep-menu-group">
    <div v-show="!menu.narrow" class="group-title">{{ title }}</div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'ep-menu-group',

    props: {
      title: String
    },

    computed: {
      menu () {
        let parent = this.$parent;
        while (parent.$options._componentTag !== 'ep-menu') {
          parent = parent.$parent;
        }
        return parent;
      }
    }
  }
</script>