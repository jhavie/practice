<template>
  <hide class="hide-sm" style="position: relative" click one-show>
    <span style="color: #FFF">{{ title }}</span>
    <template slot="hide">
      <div class="main-col">
        <template v-for="(val, key) in transfer">
          <ep-col :col="12">
            <card-li :val="contents[key]" :label="val"></card-li>
          </ep-col>
        </template>
      </div>
    </template>
  </hide>
</template>

<script>
  import hide from './hide'
  import cardLi from './card-li'

  export default {
    name: 'collapse',

    props: {
      title: String,
      transfer: Object,
      contents: Object
    },
    components: { hide, cardLi }
  }
</script>

<style>
.search-toggle-hide {
  padding: 20px; 
  background: #FFF
}
</style>