<template>
  <div class="ep-tabs" :class="[ 'ep-tabs-' + theme, position? 'ep-tabs-' + position: '' ]">
    <div class="ep-tabs-title" :class="tabsClass">
      <div class="ep-tabs-icon ep-tabs-icon-left" v-if="showPages">
        <i class="ion-chevron-left"></i>
      </div>
      <div class="ep-tabs-scroll" :class="{ 'can-scroll': canScroll }">
        <div class="ep-tabs-sclwrap" :class="{ 'ep-tabs-mobile': mobile }">
          <div class="ep-tabs-ink" :style="inkStyle"></div>
          <template v-for="tab in tabs">
            <div @click="itemClick($event, tab.name, tab.disabled)" class="ep-tabs-item"
              :class="[ activeName === tab.name? 'active': '', tab.disabled? 'disabled': '' ]">
              <i v-if="tab.icon" :class="'ion-' + tab.icon"></i> {{ tab.name }}
            </div>
          </template>
        </div>
      </div>
      <div class="ep-tabs-icon ep-tabs-icon-right" v-if="showPages">
        <i class="ion-chevron-right"></i>
      </div>
    </div>
    <div class="ep-tabs-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const classPrefix = 'ep-tabs-title-'

  function getTabItem (name, tabs) {
    let res = -1

    tabs.every((item, index) => {
      if (item.name === name) {
        res = index
        return false
      } else {
        return true
      }
    })
    return res
  }

  export default {
    name: 'ep-tabs',

    props: {
      active: {
        type: [ String, Number ],
        default: undefined
      },
      mobile: Boolean,
      border: Boolean,
      closable: Boolean,
      canScroll: Boolean,
      position: String,
      shadow: Boolean,
      showPages: Boolean,
      theme: {
        type: String,
        default: 'default'
      }
    },

    computed: {
      tabsClass () {
        let res = []
        this.shadow
          ? res.push(classPrefix + 'shadow')
          : res.push(classPrefix + 'border')
        this.middle? res.push(classPrefix + 'middle'): ''

        return res
      }
    },

    data () {
      return {
        inkStyle: {},
        tabs: [],
        activeName: undefined
      }
    },

    mounted () {
      let activeName
      if (typeof this.active === 'string') {
        activeName = this.active
      } else if (undefined === this.active) {
        if (this.tabs.length > 0) {
          activeName = this.tabs[0].name
        }
      } else if (typeof this.active === 'number') {
        activeName = this.tabs[this.active].name
      }

      this.activeName = activeName
    },

    watch: {
      active (val) {
        this.activeName = val
      },
      activeName (val) {
        this.$emit('change', val)

        this.$nextTick(() => {
          let activeEl = this.$el.querySelector('.ep-tabs-item.active')

          this.inkStyle = {
            width: `${activeEl.clientWidth}px`,
            transform: `translateX(${activeEl.offsetLeft}px)`
          }
        })
      }
    },

    methods: {
      itemClick (evt, name, disabled) {
        if (!disabled && this.activeName !== name) {
          this.activeName = name
        }
      },
      changeTab (name) {
        const $i = getTabItem(name, this.tabs)
        this.activeName = this.tabs[$i].name
      },
      addTab (tabItem) {
        let { icon, name, disabled } = tabItem
        this.tabs.push({
          icon: icon,
          name: name,
          disabled: disabled
        })
      },
      rmTab (name) {
        const index = getTabItem(name, this.tabs)
        if (index !== -1) {
          this.tabs.splice(index, 1)
        }
      }
    }
  }
</script>
