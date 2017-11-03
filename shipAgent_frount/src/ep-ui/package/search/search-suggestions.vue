<template>
    <transition name="ep-zoom-in-top" @after-leave="doDestroy">
        <div
          v-show="showPopper"
          class="ep-search-suggestion"
          :class="{ 'is-loading': parent.loading }"
          :style="{ width: dropdownWidth }"
        >
          <ep-scrollbar
            tag="ul"
            wrap-class="ep-search-suggestion__wrap"
            view-class="ep-search-suggestion__list"
          >
            <li v-if="parent.loading">
                <svg class="ep-search-loading" width="15px" height="15px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:#FFF"></circle>
                </svg>
            </li>
            <template v-for="(item, index) in suggestions" v-else>
                <li
                  v-if="!parent.customItem"
                  :class="{'highlighted': parent.highlightedIndex === index}"
                  @click="select(item)"
                >
                  {{item.value}}  
                </li>
                <component
                  v-else
                  :class="{'highlighted': parent.highlightedIndex === index}"
                  @click="select(item)"
                  :is="parent.customItem"
                  :item="item"
                  :index="index">
                </component>
            </template>
          </ep-scrollbar>
        </div>
    </transition>
</template>
<script>
  import Popper from './../../src/vue-popper';
  import emitter from './../../src/mixins/emitter';
</script>