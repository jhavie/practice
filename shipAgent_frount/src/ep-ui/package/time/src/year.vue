<template>
  <div class="ep-time-year">
    <div class="ep-time-year-head">
      <div class="ep-time-row">
        <span class="ep-time-icon" @click="changeYear(-10)">
          <i class="ion-chevron-left"></i>
        </span>
        <div class="ep-time-date-show ep-time-date-show-lg">
          {{ showYears[0] }}年 - {{ showYears[1] }}年
        </div>
        <span class="ep-time-icon" @click="changeYear(10)">
          <i class="ion-chevron-right"></i>
        </span>
      </div>
    </div>
    <div class="ep-time-year-content">
      <template v-for="item in years">
        <div class="ep-time-year-btn" @click="itemClick(item)"
          :class="{ 'active': item.date === activeYear }">{{ item.date }}</div>
      </template>
    </div>
  </div>
</template>

<script>
  import { getYear } from './utils'
  import nowYear from './now-year'

  export default {

    mixins: [ nowYear ],

    data () {
      return {
        showYears: [null, null],
        years: []
      }
    },

    methods: {
      itemClick (item) {
        this.$emit('year-change', item.date)
      },
      reflush (val) {
        this.$nextTick(() => {
          let years   = getYear(val),
              len     = years.length,
              stat    = years[0].date,
              endDate = years[len - 1].date
          this.years = years
          this.showYears = [stat, endDate]
        })
      }
    }
  }
</script>