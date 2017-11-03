<template>
  <div>
    <div class="ep-time-pick-display">
      <div class="ep-time-pick-display-year" :class="{ 'no-month': type === 'year' }">
        <span @click="getCurrentYear">
          {{ activeYear }}
        </span>
      </div>
      <h3 class="ep-time-pick-display-title" v-if="type === 'month' || type === 'date'">
        {{ showMonth }}
        <span v-if="type === 'month'">月</span>
        <span v-if="type === 'date'">
          - {{ showDate }} {{ weekDay }}
        </span>
      </h3>
    </div>
    <div class="ep-time-pick-sidebar" v-if="pickOptions">
      <template v-for="pickOption in pickOptions">
        <ep-tag @click.native="pickOptionClick(pickOption)" type="primary">{{ pickOption.title }}</ep-tag>
      </template>
    </div>
    <div class="ep-time-pick-body">
      <date ref="date" 
        v-show="currentType === 'date'"
        v-if="type === 'date'"
        :active-date="activeDate"
        :active-year="activeYear"
        :active-month="activeMonth"
        @change="dateChange"
        ></date>
      <month ref="month"
        v-show="currentType === 'month'"
        v-if="'date|month'.indexOf(type) > -1"
        :active-year="activeYear"
        :active-month="activeMonth"
        @month-change="monthChange"></month>
      <year ref="year"
        v-show="currentType === 'year'"
        v-if="'date|month|year'.indexOf(type) > -1"
        :active-year="activeYear"
        @year-change="yearChange"></year>
    </div>
    <div class="ep-time-action">

    </div>
  </div>
</template>

<script>
  const stop = e => e.stopPropagation()
  import { getYear, getMonth, getNow, isDate } from './utils'
  import year from './year'
  import month from './month'
  import date from './date'
  import dateUtil from './dateUtil'
  const weekDay = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
  const DEFAULT_FORMAT_TYPE = {
    date: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    year: 'YYYY'
  }


  function isEmpty (str) {
    return str === null || str === undefined || str === ''
  }

  function addZero (num) {
    if (parseInt(num) < 10) {
      return "0" + num
    }
    return num
  }

  export default {

    components: { year, month, date },
    
    props: {
      //date, month, year
      type: String,
      visible: Boolean,
      pickOptions: Array,
      position: {
        type: String,
        default: 'top'
      },
      time: {}
    },

    data () {
      return {
        currentType: this.type,
        activeMonth: null,
        activeYear: null,
        activeDate: null
      }
    },

    watch: {
      visible (val) {
        if (val) {
          this.handleShow()
        } else {

        }
      }
    },

    mounted () {
      this.$el.addEventListener('click', stop)
    },

    methods: {
      //input|change
      change (date, isClose) {
        if (isClose) {
          // TODO
        } else {
          this.$emit('input', false)
          this.$emit('change', date)
        }
      },
      //Show type handle
      yearHandle(type, times) {
        this.activeYear = parseInt(times[0])

        this.$refs[type].reflush(this.activeYear)
      },
      monthHandle (type, times) {
        this.activeYear = parseInt(times[0])
        this.activeMonth = parseInt(times[1])
      },
      dateHandle (type, times) {
        this.activeYear = parseInt(times[0])
        this.activeMonth = parseInt(times[1])
        this.activeDate = parseInt(times[2])

        this.$refs[type].reflush(this.activeYear, this.activeMonth)
      },
      handleShow () {
        let times = '' + this.time,
            type  = this.type
        if (isEmpty(times)) {
          times = getNow()
        } else {
          times = times.split("-")
        }
        this[type + 'Handle'].call(this, type, times)
        this.currentType = type
      },

      getCurrentYear () {
        this.currentType = 'year'
        this.$refs.year.nowYear = this.activeYear
      },
      //Emit change handle
      yearChange (year) {
        if (this.type === 'year') {
          this.change(year)
        } else {
          this.currentType = 'month'
          this.activeYear = year
        }
      },
      monthChange (year, month) {
        if (this.type === 'month') {
          this.change(year + '-' + addZero(month + 1))
        } else {
          this.currentType = 'date'
          this.activeYear = year
          this.activeMonth = month + 1
        }
      },
      dateChange (year, month, date) {
        this.activeYear = year
        let emitDate = year
        
        if (month !== undefined) {
          this.activeMonth = month
          emitDate += '-' + addZero(month)
        }
        if (date !== undefined) {
          this.activeDate = date
          emitDate += '-' + addZero(date)
        }
        this.change(emitDate)
      },
      pickOptionClick (options) {
        let date = options.onClick.apply()
        if (isDate(date)) {
          date = dateUtil.format(date, DEFAULT_FORMAT_TYPE[this.type])
        }
        this.change(date)
      }
    },

    beforeDestroy() {
      this.$el.removeEventListener('click', stop)
    },

    computed: {
      weekDay () {
        let week = new Date(this.activeYear, this.activeMonth - 1, this.activeDate)
        week = week.getDay()
        return weekDay[week]
      },
      showMonth () {
        return addZero(this.activeMonth)
      },
      showDate () {
        return addZero(this.activeDate)
      }
    }


  }
</script>