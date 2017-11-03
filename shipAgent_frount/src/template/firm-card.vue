<template>
  <div class="contents-card list-block">
    <div class="search-result-header">
      <img src="../assets/widget/bg-icon.png" width="50" height="50"  alt="">
      <div class="result-header-contents">
        <h3 class="">{{ label }}</h3>
        <p>{{ title }}</p>
      </div>
    </div>
    <ul class="search-result-main">
      <ep-row>
        <template v-if="!$slots.default" v-for="(val, key) in transfer">
          <ep-col :col="12">
            <li>
              <label>{{ val }}</label>
              <template v-if="contents[key]">
                {{ contents[key] }}
              </template>
              <template v-else>
                <font color="#DDD">暂无数据</font>
              </template>
            </li>
          </ep-col>
        </template>
      </ep-row>
      <slot></slot>
      <div v-show="show">
        <slot name="hide"></slot>
      </div>
    </ul>
    <div @click="handleClick" class="search-icon">
      <i :class="show? 'ion-chevron-up': 'ion-chevron-down'"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'firm-card',
    props: {
      index: Number,
      label: String,
      title: String,
      contents: Object,
      transfer: Object,
      firstOpen: Function
    },

    data () {
      return {
        show: false,
        isFirstOpen: false
      }
    },

    methods: {
      handleClick () {
        if (!this.isFirstOpen) {
          this.isFirstOpen = true
          this.$emit('first-open', this)
        } else {
          this.show = !this.show
        }
      },
      cardShow () {
        this.show = true
      },
      //Wrong data handle
      reset () {
        this.isFirstOpen = false
        this.show = false
      }
    }
  }
</script>

<style>
.list-block {
  border-top: 5px solid #C4C4C4;
  -webkit-transition: box-shadow .3s;
  transition: box-shadow .3s;
}
.list-block:hover {
  box-shadow: 0px 6px 7px rgba(0, 0, 0, .2)
}
.search-result-header {
  position: relative;
  min-height: 50px
}
.search-result-header > img {
  user-select: none;
  position: absolute;
  left: 0px;
  top: 0px
}
.result-header-contents {
  padding-left: 70px;
  line-height: 20px
}
.result-header-contents > h3 {
  cursor: default;
  user-select: none;
  margin: 0 0 4px 0;
  font-size: 18px
}
.result-header-contents > p {
  margin: 0;
  font-size: 16px;
  line-height: 26px;
  color: #1E90FF
}
.search-result-main {
  margin: 0;
  margin-top: 15px;
  padding: 0;
  list-style: none
}
.search-result-main li {
  line-height: 2em
}
.search-result-main label {
  user-select: none;
  display: inline-block;
  min-width: 120px;
  vertical-align: top;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 2em
}
.search-icon {
  cursor: pointer;
  padding: 5px 0px;
  text-align: center
}
</style>