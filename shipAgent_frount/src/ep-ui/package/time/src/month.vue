<template>
  <div class="ep-time-month">
    <div class="ep-time-month-head">
      <div class="ep-time-row">
        <span class="ep-time-icon" @click="changeYear(-1)">
          <i class="ion-chevron-left"></i>
        </span>
        <div class="ep-time-date-show ep-time-date-show-lg">
          {{ nowYear }}年
        </div>
        <span class="ep-time-icon" @click="changeYear(1)">
          <i class="ion-chevron-right"></i>
        </span>
      </div>
    </div>
    <div class="ep-time-month-content">
      <template v-for="(item, index) in months">
        <div class="ep-time-month-btn" @click="itemClick(index)"
          :class="{ 'active': index + 1 === activeMonth && nowYear === activeYear }">{{ item }}</div>
      </template>
    </div>
  </div>
</template>

<script>
  import { getMonth } from './utils'
  import nowYear from './now-year'

  export default {

    mixins: [ nowYear ],

    props: {
      activeMonth: Number
    },

    data () {
      return {
        months: getMonth()
      }
    },

    methods: {
      itemClick (month) {
        this.$emit('month-change', this.nowYear, month)
      }
    }
  }
</script>