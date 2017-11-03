<template>
  <div class="ep-time-date">
    <div class="ep-time-date-head">
      <div class="ep-time-row">
        <span class="ep-time-icon ep-time-icon-four" @click="changeYear(-1)">
          <i class="ion-chevron-left"></i>
        </span>
        <span class="ep-time-icon ep-time-icon-four" @click="changeMonth(-1)">
          <i class="ion-chevron-left"></i>
        </span>
        <div class="ep-time-date-show">
          {{ nowYear }}年 - {{ showMonth }}月
        </div>
        <span class="ep-time-icon ep-time-icon-four" @click="changeMonth(1)">
          <i class="ion-chevron-right"></i>
        </span>
        <span class="ep-time-icon ep-time-icon-four" @click="changeYear(1)">
          <i class="ion-chevron-right"></i>
        </span>
      </div>
      <div class="ep-time-row">
        <span v-for="week in weeks" class="week">{{ week }}</span>
      </div>
    </div>
    <div class="ep-time-date-content">
      <template v-for="date in dates">
        <div class="ep-time-date-btn"
          :class="{ 
            'ep-time-date-empty': date.isEmpty,
            'active': isActive(date) }"
            @click="itemClick(date)">
          <div class="ep-time-date-btndiv"></div>
          <span>{{ date.date }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import { getDate, getWeeks } from './utils'
  export default {
    props: {
      activeDate: Number,
      activeYear: Number,
      activeMonth: Number
    },
    data () {
      return {
        dates: [],
        weeks: getWeeks(),
        nowMonth: null,
        nowYear: null
      }
    },
    mounted () {
      this.nowMonth = this.activeMonth
      this.nowYear = this.activeYear
    },
    computed: {
      showMonth () {
        if (this.nowMonth < 10) {
          return '0' + this.nowMonth
        }
        return this.nowMonth
      }
    },
    watch: {
      nowMonth (val) {
        this.reflush(this.nowYear, val)
      },
      nowYear (val) {
        this.reflush(val, this.nowMonth)
      },
      activeMonth (val) {
        this.nowMonth = val
      },
      activeYear (val) {
        this.nowYear = val
      }
    },
    methods: {
      itemClick (date) {
        let activeDate = date.date
        if (date.isEmpty) {
          switch (date.month) {
            case 1:
              this.$emit('change', this.nowYear + 1, 1, activeDate)
              break;
            case 12:
              this.$emit('change', this.nowYear - 1, 12, activeDate)
              break;
            default:
              this.$emit('change', this.nowYear, date.month, activeDate)
              break;
          }
        } else {
          this.$emit('change',this.nowYear, date.month, activeDate)
        }
        
      },
      isActive (date) {
        return date.date === this.activeDate
          && date.month === this.activeMonth
          && this.nowYear === this.activeYear
      },
      changeMonth (num) {
        let month = this.nowMonth + num
        switch (month) {
          case 0:
            this.nowYear = this.nowYear - 1
            this.nowMonth = 12
            break;
          case 13:
            this.nowYear = this.nowYear + 1
            this.nowMonth = 1
            break;
          default:
            this.nowMonth = month
            break;
        }
      },
      changeYear (num) {
        this.nowYear = this.nowYear + num
      },
      reflush (year, month) {
        this.$nextTick(() => {
          this.dates = getDate(year, month)
          this.nowYear = year
          this.nowMonth = month
        })
      }
    }
  }
</script>