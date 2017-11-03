<template>
	<ul class="ep-pager-list" @click="handleClick">
    <li class="ep-pager-icon ion-chevron-left"
      :class="{ 'is-disabled': leftDisabled }"></li>
    <li v-if="pageCount > 0" 
      :class="{ active: 1 === nowPage  }">1</li>
    <li v-if="showLeftMore" class="ep-pager-more">...</li>

    <li v-for="page in pagers"
      :class="{ 'active': page === nowPage }">{{ page }}</li>

    <li v-if="showRightMore" class="ep-pager-more">...</li>
    <li v-if="pageCount > 1" 
      :class="{ active: nowPage === pageCount }">{{ pageCount }}</li>
    <li class="ep-pager-icon ion-chevron-right"
      :class="{ 'is-disabled': rightDisabled }"></li>
  </ul>
</template>
<script>
  export default {

    name: 'pager',

    props: {
      nowPage: Number,
      pageCount: Number
    },

    data () {
      return {
        showLeftMore: false,
        showRightMore: false,
        dark: {
          color: 'dark'
        }
      }
    },

    computed: {
      pagers () {
        let pagerCount = 7;

        const nowPage = this.nowPage;
        const pageCount = this.pageCount;

        let showLeftMore = false;
        let showRightMore = false;
        
        let min = 2;
        let max = pageCount - 1;
        if (pageCount > 7) {
          if (nowPage - 3 > 2) {
            showLeftMore = true;
            min = nowPage - 2;
          }
          max = min + 4; 
          if (max <= pageCount - 2) {
            showRightMore = true;
          } else {
            max = pageCount - 1;
            min = max - 4;
          }
        } else {
          showLeftMore = false;
          showRightMore = false;
          min = 2;
          max = pageCount - 1;
        }

        let ret = [];
        if (min <= max) {
          for (let i = min; i <= max; i++) {
            ret.push(i);
          }
        }

        this.showLeftMore = showLeftMore;
        this.showRightMore = showRightMore;
        return ret;
      },
      leftDisabled () {
        if (this.nowPage === 1) {
          return true;
        } else {
          return false;
        }
      },
      rightDisabled () {
        if (this.nowPage === this.pageCount) {
          return true;
        } else {
          return false;
        }
      }
    },

    methods: {
      handleClick(ev) {
        const target = ev.target;
        const className = target.className;
        if (target.tagName === 'UL')
          return;
        if (className.indexOf('is-disabled') > -1 || className.indexOf('ep-pager-more') > -1)
          return;

        let newPage = Number(event.target.textContent);
        const pageCount = this.pageCount;
        const nowPage = this.nowPage;

        if (className.indexOf('chevron') > -1) {
          if (className.indexOf('left') > -1) {
            newPage = nowPage - 1;
          } else if (className.indexOf('right') > -1) {
            newPage = nowPage + 1;
          }
        }

        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }
          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }

        if (newPage !== nowPage) {
          this.$emit('change', newPage);
        }
      }
    }

  }
</script>