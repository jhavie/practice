<template>
  <div class="ep-select"
    @click="toggleClick" @mouseenter="handleEnter" @mouseleave="currentClearBtn = false"
    v-clickoutside="off" :class="{ 'active': visible }">
    <div class="ep-input"
      :class="iptStyle">
      <i class="ep-input__icon ion-chevron-down" v-show="!currentClearBtn"></i>
      <i class="ep-input__icon ep-select-close ion-close-circled" v-show="currentClearBtn" @click.stop="clearVal"></i>
      <input
        class="ep-input__inner"
        autocomplete="off"
        readonly="readonly"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="currentVal"
        :name="name"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.tab="visible = false">
    </div>
    <transition name="ep-select-drop-fade">
      <div v-show="visible" class="ep-drop ep-select-drop" :class="'ep-drop-' + position" @click.stop>
        <div class="ep-drop-wrap ep-select-drop-warp" ref="wrap">
          <ul>
            <li class="ep-select-drop-item" v-for="(label, key) in labels" @click="itemSelect($event, label.value)"
              :data-value="label.value" :data-disabled="label.disabled"
              @mouseenter="changeSelect(key)"
              :class="[ 
                value === label.value? 'active': '', 
                key === nowSelect? 'selected': '', 
                label.disabled? 'disabled': '' ]">{{ label.label }} {{excVal}}<span v-if="showVal">({{ label.value }})</span></li>
            <slot v-if="$slots.default"></slot>
            <li class="ep-select-drop-none" v-if="labelEmpty">暂无数据</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  //TODO Array
  import emitter from './../../src/mixins/emitter'
  import Clickoutside from './../../src/clickoutside'

  function findNum(label, match) {
    let res
    label.every((item, index) => {
      if (item.value === match) {
        res = index
        return false
      }
      return true
    })
    return res
  }

  export default {
    name: 'ep-select',

    mixins: [ emitter ],

    directives: { Clickoutside },

    created () {
      if (!this.isEmpty) {
        this.nowLabel = findNum(this.labels, this.value)
        if (this.nowLabel!== undefined) {
          this.currentVal = this.labels[this.nowLabel].label
          if (this.excVal !== undefined) {
            this.currentVal += this.excVal
          }
        } else {
          this.currentVal = this.value
        }
      } else {
        this.$emit('input', '')
      }
    },

    props: {
      name: String,
      excVal: String,
      showVal: Boolean,
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: Boolean,
      label: Array,
      value: {
        required: true
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      position: {
        type: String,
        default: 'top'
      },
      size: String
    },

    data () {
      return {
        currentClearBtn: false,
        focusVis: false,
        nowLabel: -1,
        nowSelect: -1,
        currentVal: '',
        visible: false
      }
    },
    
    computed: {
      labels () {
        let res = []
        if (this.label.length > 0) {
          if (this.label[0].value !== undefined
            && this.label[0].label !== undefined) {
            return this.label
          } else {
            if (typeof this.label[0] !== 'object') {
              this.label.forEach((item) => {
                res.push({ value: item, label: item })
              })
            }
          }
        }
        return res
      },
      iptStyle () {
        let res = []
        if (this.disabled) {
          res.push('is-disabled')
        }
        if (this.size) {
          res.push('ep-input--' + this.size)
        }
        return res
      },
      isEmpty () {
        if (this.value !== undefined 
          && this.value !== null && this.value !== '') {
          return false
        }
        return true
      },
      labelEmpty () {
        if (this.labels.length === 0) {
          return true
        }
        return false
      }
    },

    watch: {
      value (val, oldVal) {
        this.setCurrentValue(val, oldVal)
      },
      visible (val) {
        if (val) {
          this.nowLabel
            ? this.nowSelect = this.nowLabel
            : null
          
          this.$nextTick(() => {
            this.handlePosition()
          })
        } else {
          this.$el.querySelector('input').blur()
          this.$refs.wrap.scrollTop = 0
        }
      }
    },

    methods: {
      setCurrentValue (val, oldVal) {
        let curVal = val
        if (this.isEmpty) {
          //这三个参数相互变化不认为数据发生变化
          if (oldVal === '' || oldVal === undefined || oldVal === null) {
            return
          }
          curVal = ''
          
        }
        this.$emit('change', curVal)
          this.dispatch('ep-form-item', 'ep.form.change', [curVal])
        this.nowLabel = findNum(this.labels, val)
        if (this.nowLabel!== undefined) {
          this.currentVal = this.labels[this.nowLabel].label
          if (this.excVal !== undefined) {
            this.currentVal += this.excVal
          }
        } else {
          this.currentVal = ''
        }
      },
      handlePosition () {
        let dom       = this.$refs.wrap,
            selectDom = dom.querySelector('ul > .selected'),
            scrollTop = dom.scrollTop,
            nowSelect = this.nowSelect
            
        const length  = 240

        if (!selectDom) return

        if (nowSelect === 0) {
          dom.scrollTop = 0
          return
        }
        if (nowSelect === this.label.length - 1) {
          dom.scrollTop = selectDom.offsetTop
          return
        }

        let distence = selectDom.offsetTop - scrollTop

        if (distence < 0) {
          distence -= 12
          dom.scrollTop += distence
          return
        } else {
          let move = distence + selectDom.offsetHeight - 240
          if (move > 0) {
            move -= 13
            dom.scrollTop += move
            return
          }
        }
      },
      navigateOptions (direction) {
        if (this.label && this.label.length > 0) {
          if (direction === 'next') {
            this.nowSelect++
            if (this.nowSelect === this.label.length) {
              this.nowSelect = 0
            }
            if (this.label[this.nowSelect].disabled) {
              this.navigateOptions('next')
            } else {
              this.$nextTick(() => {
                this.handlePosition()
              })
            }
          }
          if (direction === 'prev') {
            this.nowSelect--;
            if (this.nowSelect < 0) {
              this.nowSelect = this.label.length-1;
            }
            if (this.label[this.nowSelect].disabled) {
              this.navigateOptions('prev')
            } else {
              this.$nextTick(() => {
                this.handlePosition()
              })
            }
          }
        }
      },
      selectOption () {
        const val = this.nowSelect
        this.$emit('input', this.label[val].value
          ?this.label[val].value
          : this.label[val])
        this.off()
      },
      //共享一个关闭
      off () {
        this.visible = false
      },
      toggleClick (evt) {
        if (!this.disabled) {
          if (this.focusVis) {
            if (!this.visible) {
              this.visible = true
            }
            this.focusVis = false
          } else {
            this.visible = !this.visible
          }
        }
      },
      changeSelect ($i) {
        if (!this.label[$i].disabled) {
          this.nowSelect = $i
        }
      },
      itemSelect (evt, val) {
        if (this.visible) {
          let $data = evt.target.dataset
          if (!$data.disabled) {
            this.visible = false
            this.$emit('input', val)
          }
        }
      },
      handleBlur (event) {
        this.$emit('blur', event)
        this.dispatch('ep-form-item', 'ep.form.blur', [this.value])
      },
      handleFocus (event) {
        //解决回调
        if (!this.visible) {
          this.focusVis = true
          this.visible = true
        }
        this.$emit('focus', event)
        this.dispatch('ep-form-item', 'ep.form.focus')
      },
      handleEnter () {
        if (this.clearable && !this.isEmpty) {
          this.currentClearBtn = true
        }
      },
      clearVal () {
        this.$emit('input', '')
        this.currentClearBtn = false
      }
    }
  }
</script>
