/**
 * Year Handle
 */
export default {

  props: {
    activeYear: Number
  },

  data () {
    return {
      nowYear: null
    }
  },

  mounted () {
    this.nowYear = this.activeYear
  },

  watch: {
    activeYear (val) {
      this.nowYear = val
    },
    nowYear (val) {
      this.reflush? this.reflush(val): null
    }
  },

  methods: {
    changeYear (num) {
      this.nowYear += num
    }
  }

}