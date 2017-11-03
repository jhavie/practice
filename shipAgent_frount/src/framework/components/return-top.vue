<template>
  <div class="card-shadow panel-return-top" :class="'panel-' + theme"
    v-show="showToTop" @click.stop="handleClick">
    <i class="ion-arrow-up-b"></i>
  </div>
</template>

<script>
  import { on, off } from 'utils'
  let $el = null
  let scrollEl = null

  export default {
    name: 'returnTop',

    mounted () {
      $el = this.dom? this.dom: document
      if (!$el.children.length > 0) {
        throw new Error('Binding DOM has no children to Scroll!')
      }
      if (document === $el) {
        scrollEl = document.body
      } else {
        scrollEl = $el.children[0]
      }
      
      on ($el, 'scroll', this.isShow)
    },

    props: {
      dom: Object,
      theme: {
        type: String,
        default: 'blue'
      }
    },

    data () {
      return {
        mode: 'normal',
        showToTop: false
      }
    },

    methods: {
      isShow () {
        if (scrollEl.scrollTop > 20) {
          this.showToTop = true
        } else {
          this.showToTop = false
        }
      },

      handleClick () {
        if (this.mode !== 'scrolling') {
          this.mode = 'scrolling'
          this.toTop()
        }
      },

      toTop () {
        const scrollTop = scrollEl.scrollTop
        if (scrollTop >= 20) {
          scrollEl.scrollTop -= 20
          setTimeout(() => {
            this.toTop()
          }, 1000 / 120)
        } else {
          this.mode = 'normal'
          scrollEl.scrollTop = 0
        }
      }
    },

    destroyed () {
      off ($el, 'scroll', this.isShow)
    }
  }
</script>
