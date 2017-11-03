<template>
  <div class="contents-card">
    <template v-if="click">
      <div class="show-click" @click="toggle">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div class="show">
        <slot></slot>
      </div>
    </template>
    <i v-if="!click" class="show-icon ion-android-arrow-dropdown-circle" @click="toggle" :class="{ 'icon-active': show }"></i>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave">
        <div class="search-toggle" v-show="currentShow">
          <div class="search-toggle-hide">
            <slot name="hide"></slot>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
  import Transition from '../ep-ui/src/mixins/menu-transition'

  export default {
    name: 'hide',
    mixins: [ Transition ],

    props: {
      value: {
        type: Boolean,
        default: undefined
      },
      click: Boolean,
      oneShow: Boolean
    },

    mounted() {
      if (this.oneShow) {
        this.show = true
      }
    },

    data () {
      return {
        openOnce: false,
        show: false
      }
    },

    computed: {
      currentShow () {
        if (this.value !== undefined) {
          return this.value
        }
        return this.show
      }
    },

    watch: {
      show (val) {
        if (!this.openOnce) {
          this.$emit('open-once', this)
          this.openOnce = true
        }
        if (val) {
          this.$emit('open', this)
        } else {
          this.$emit('close', this)
        }
        
      }
    },

    methods: {
      toggle () {
        if (this.value !== undefined) {
          this.$emit('input', !this.value)
        } else {
          this.show = !this.show
        }
      }
    }
  }
</script>

<style lang="">
  .show-icon {
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: 15px;
    right: 20px;
    padding: 5px;
    color: #FFF;
    font-size: 18px;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .show-click {
    padding: 0 10px 7px 10px
  }
  .hide-sm {
    margin-bottom: 7px;
    padding: 7px 0 0 0;
    font-size: 14px
  }
  .hide-sm .show-icon {
    top: 2px;
    right: 15px;
    font-size: 14px
  }
  .hide-sm .search-toggle-hide {
    padding: 10px
  }
  .icon-active {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg)
  }
  .show-click {
    cursor: pointer
  }
</style>