<template>
  <div class="tab-main">
    <div class="tab-icon tab-icon-left" :class="{ disabled: scrollLeft >= 0 }" @click="upOrDown(0)">
      <i class="ion-chevron-left"></i>
    </div>
    <div class="tab-main-block">
      <div class="tab-scroll" :class="'tab-' + theme" :style="{ left: scrollLeft + 'px' }">

        <template v-for="(tab, index) in tabs">
          <span :class="{ 'active': index === value }" :data-index="index"
            @click="itemClick($event, index)">
            <div>
              <i v-if="tab.icon" class="tab-span-icon" :class="'ion-' + tab.icon"></i>
              <i v-else class="tab-span-icon ion-ios-keypad"></i>
              {{ tab.name }}
              <i v-if="index !== 0" class="tab-close ion-close-round"></i>
            </div>
          </span>
        </template>
      </div>
    </div>
    <div class="tab-icon tab-icon-right"
      :class="{ disabled: parentWidth - scrollLeft >= scrollWidth }" @click="upOrDown(1)">
      <i class="ion-chevron-right"></i>
    </div>
  </div>
</template>

<script>
  import { on, off } from 'utils'
  import throttle from 'throttle-debounce/throttle'
  

  // 多tab移动距离的计算
  //width为内部滚动元素长度，div为父元素长度
  function toggleRemoveWhenTooManyTab(left, width, div, toggle) {
    let widthIsRolled = Math.abs(left)
    let nowHaveWidthNeedRoll = width - widthIsRolled

    if (toggle === 1) {
      //内部宽度如果小于显示宽度的两倍，移动到底，否则移动一个显示宽度的内容
      if (nowHaveWidthNeedRoll < div * 2) {
        return nowHaveWidthNeedRoll - div
      }
    } else {
      //如果比显示宽度小，移动到最前面，否则移动一个显示宽度
      if (widthIsRolled < div) {
        return widthIsRolled
      }
    }
    return div
  }
  
  export default {
    name: 'ep-tab',

    props: {
      theme: {
        type: String,
        default: 'blue'
      },
      noClose: Boolean,
      value: {
        type: Number,
        default: 0
      },
      tabs: Array
    },

    data () {
      return {
        parentEl: null,
        scrollEl: null,

        parentWidth: 0,
        scrollWidth: 0,

        scrollLeft: 0
      }
    },
    mounted () {
      let vm = this
      if (this.tabs.length < 1) {
        throw new Error('Template Must have one tab!')
      }
      this.initEl()
      this.changeSize = throttle (300, () => {
        vm.reloadEl()
      })
      on (window, 'resize', this.changeSize)
    },

    methods: {
      //样式改进
      addProp () {
        this.$nextTick(() => {
          this.reloadEl()
          let left = this.parentWidth - this.scrollWidth;
          if (left < 0) {
            this.scrollLeft = left
          }
        })
      },
      upOrDown (toggle) {
        const div = this.parentWidth
        const width = this.scrollWidth
        const left = this.scrollLeft

        if (left < 0 && toggle === 0) {
          this.scrollLeft += toggleRemoveWhenTooManyTab(left, width, div, toggle)
        }

        const min = width - div
        if (Math.abs(left) < min && toggle === 1) {
          this.scrollLeft -= toggleRemoveWhenTooManyTab(left, width, div, toggle)
        }
      },

      itemClick (evt, $index) {
        const className = evt.target.className

        //关闭
        if (className.indexOf('tab-close') !== -1) {
          this.handleClose(evt, $index)
        } else {
          //改变tabs
          this.handleChange($index)
        }
      },
      //关闭tab
      handleClose (evt, $index) {
        const width = evt.currentTarget.clientWidth
        const left = Math.abs(this.scrollLeft)
        if (left > 0 && left >= width) {
          this.scrollLeft += width
        } else {
          if (this.scrollLeft !== 0) {
            this.scrollLeft = 0
          }
        }

        if ($index === this.value) {
          //关闭当前标签页
          if (this.value > 0) {
            const nowIndex = this.value - 1
            this.$emit('input', nowIndex)
            this.$emit('change', nowIndex, this.tabs[nowIndex])
          }
        } else {
          //非当前标签页
          if ($index < this.value) {
            this.$emit('input', this.value - 1)
          }
        }
        this.$emit('close', $index, this.tabs[$index])
        this.tabs.splice($index, 1)
        this.$nextTick(() => {
          this.reloadEl()
        })
      },
      handleChange ($index) {
        if (this.value !== $index) {
          this.$emit('input', $index)
          this.$emit('change', $index, this.tabs[$index])
        }
      },
      initEl () {
        this.parentEl = this.$el.querySelector('.tab-main-block')
        this.scrollEl = this.$el.querySelector('.tab-scroll')

        this.parentWidth = this.parentEl.clientWidth
        this.scrollWidth = this.scrollEl.clientWidth
      },
      reloadEl () {
        this.parentWidth = this.parentEl.clientWidth
        this.scrollWidth = this.scrollEl.clientWidth
      }
    },

    destroyed () {
      off (window, 'resize', this.changeSize)
    }
  }
</script>

<style>
  .tab-main-block * {
    -webkit-user-select: none;
    user-select: none
  }
  .tab-main, .tab-icon, .tab-main-block, 
  .tab-scroll, .tab-scroll > span, .tab-scroll > span > div {
    height: 40px;
    line-height: 40px
  }
  .tab-main {
    position: relative;
    border-bottom: 1px solid #AAA;
    width: 100%;
    font-size: 14px;
    background-color: #FFF
  }
  .tab-icon {
    cursor: pointer;
    width: 40px;
    position: absolute;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  .tab-icon:active {
    opacity: .7
  }
  .tab-icon-left {
    left: 0px;
  }
  .tab-icon-right {
    right: 0px;
  }
  .tab-icon.disabled {
    pointer-events: none;
    color: #AAA;
  }
  .tab-main-block {
    position: absolute;
    left: 40px;
    right: 40px;
    width: auto;
    overflow: hidden
  }
  .tab-scroll {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    -webkit-transition: left .5s cubic-bezier(.23,1,.32,1);
    transition: left .5s cubic-bezier(.23,1,.32,1)
  }
  .tab-scroll > span, .tab-scroll > span > div, .tab-close {
    -webkit-transition: all .1s;
    transition: all .1s
  }
  .tab-scroll > span {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    padding: 0 15px;
    border-width: 0px;
    border-style: solid;
    height: 40px;
    min-width: 80px;
    text-align: center;
    vertical-align: middle;
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
  }
  .tab-scroll > span:hover {
    border-bottom-width: 3px
  }
  .tab-scroll > span i {
    padding: 3px;
  }
  .tab-scroll > .active {
    font-size: 1.15em;
    border-bottom-width: 3px;
    color: #2196F3
  }
  .tab-close {
    vertical-align: baseline;
    font-size: 12px;
    margin-left: 2px
  }
  .tab-scroll > .active .tab-close {
    font-size: 13px;
  }
  .tab-close:hover {
    color: #999
  }
  .tab-close:active {
    opacity: .7
  }
  .tab-span-icon {
    vertical-align: baseline;
    margin-right: 7px
  }
  .tab-dark > span, .ep-ripple-dark {
    border-color: #2c3e50;
  }
  .tab-blue > span, .ep-ripple-blue {
    border-color: #2196f3;
  }
  .tab-dark-blue > span, .ep-ripple-dark-blue {
    border-color: #3498db;
  }
  .tab-green > span, .ep-ripple-green {
    border-color: #1abc9c;
  }
  .tab-pupple > span, .ep-ripple-pupple {
    border-color: #8e44ad;
  }
  .tab-orange > span, .ep-ripple-orange {
    border-color: #f39c12;
  }
  .tab-dark > .active, .tab-icon.tab-dark:hover {
    color: #2c3e50;
  }
  .tab-blue > .active, .tab-icon.tab-blue:hover {
    color: #2196f3;
  }
  .tab-dark-blue > .active, .tab-icon.tab-dark-blue:hover {
    color: #3498db;
  }
  .tab-green > .active, .tab-icon.tab-green:hover {
    color: #1abc9c;
  }
  .tab-pupple > .active, .tab-icon.tab-pupple:hover {
    color: #8e44ad;
  }
  .tab-orange > .active, .tab-icon.tab-orange:hover {
    color: #f39c12;
  }
</style>