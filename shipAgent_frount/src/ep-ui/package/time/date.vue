<template>
  <div class="ep-time" @click="currentVisible = true" v-clickoutside="off">
    <ep-input
      v-model="currentVal"
      :readonly="readonly"
      :placeholder="placeholder" icon="calendar"
      @focus="currentVisible = true"
      @keydown.native.esc.stop.prevent="currentVisible = false"
      @keydown.native.tab="currentVisible = false"></ep-input>
    <transition name="ep-select-drop-fade" v-if="!model">
      <div v-show="currentVisible" class="ep-drop ep-time-drop" :class="'ep-drop-' + position">
        <div class="ep-drop-wrap ep-time-pick">
          <date-picker :visible="currentVisible"
            @change="handleChange"
            :type="type" :time="value"
            :pick-options="pickOptions"
            :position="position"></date-picker>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import datePicker from './src/datePicker'
  import Clickoutside from './../../src/clickoutside'

  export default {

    name: 'ep-date',

    components: { datePicker },

    directives: { Clickoutside },

    props: {
      defVisible: Boolean,
      model: Boolean,
      readonly: Boolean,
      pickOptions: Array,
      placeholder: String,
      position: String,
      type: {
        type: String,
        default: 'date'
      },
      value: {}
    },

    data () {
      return {
        currentVisible: this.defVisible || false,
        currentVal: ''
      }
    },

    watch: {
      value (val) {
        this.currentVal = val
      }
    },

    methods: {
      handleChange (value) {
        this.$emit('input', value)
        this.currentVisible = false
        this.currentVal = value
      },
      off () {
        this.currentVisible = false
      }
    }
  }
</script>