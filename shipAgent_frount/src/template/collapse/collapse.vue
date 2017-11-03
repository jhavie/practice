<template>
  <div class="contents-card">
    <div class="show">
      <slot></slot>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave">
        <div class="hide" v-show="show">
          <slot name="hide"></slot>
        </div>
    </transition>
  </div>
</template>

<script>
  import Transition  from '../../ep-ui/src/mixins/menu-transition'
  export default {
    name: 'collapse',
    mixins: [ Transition ],

  }
</script>