<template>
    <div class="ep-search" v-clickoutside="handleClickoutside">
        <ep-input ref="input" :value="value" :disabled="disabled" :placeholder="placeholder" :name="name" :size="size" :icon="icon"
            :on-icon-click="onIconClick" @change="handleChange" @focus="handleFocus" @blur="handleBlur" @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
            @keydown.down.native.prevent="highlight(highlightedIndex + 1)" @keydown.enter.stop.native="handleKeyEnter">
            <template slot="prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </template>
            <template slot="append" v-if="$slots.append">
                <slot name="append"></slot>
            </template>
            </ep-input>
            <ep-search-suggestions :class="[popperClass ? popperClass : '']" ref="suggestions" :suggestions="suggestions">
            </ep-search-suggestions>
    </div>
</template>
<script>
    import EpInput from "./../input";
    import Clickoutside from "./../../src/clickoutside";
    import EpSearchSuggestions from './search-suggestions.vue';
    import emitter from './../../src/mixins/emitter';

    export default {
        name: 'ep-search',

        mixins: [emitter],

        componentName: 'ep-search',
        components: {
            EpInput,
            EpSearchSuggestions
        },

        directives: { Clickoutside },

        props: {
            popperClass: String,
            placeholder: String,
            disabled: Boolean,
            name: String,
            size: String,
            value: String,
            autofocus: Boolean,
            fetchSuggestions: Function,
            triggerOnFocus: {
                type: Boolean,
                default: true
            },
            customItem: String,
            icon: String,
            onIconClick: Function
        },
        data() {
            return {
                isFocus: false,
                suggestions: [],
                loading: false,
                highlightedIndex: -1
            };
        },
        computed: {
            suggestionVisible() {
                const suggestions = this.suggestions;
                let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
                return (isValidData || this.loading) && this.isFocus;
            }
        },
        watch: {
            suggestionVisible(val) {
                this.broadcast('EpSearchSuggestions', 'visible', [val, this.$refs.input.$refs.input.offsetWidth]);
            }
        },
        methods: {
            getData(queryString) {
                this.loading = true;
                this.fetchSuggestions(queryString, (suggestions) => {
                    this.loading = false;
                    if (Array.isArray(suggestions)) {
                        this.suggestions = suggestions;
                    } else {
                        console.error('search suggestions must be an array');
                    }
                });
            },
            handleChange(value) {
                this.$emit('input', value);
                if (!this.triggerOnFocus && !value) {
                    this.suggestions = [];
                    return;
                }
                this.getData(value);
            },
            handleFocus() {
                this.isFocus = true;
                if (this.triggerOnFocus) {
                    this.getData(this.value);
                }
            },
            handleBlur() {
                // 因为 blur 事件处理优先于 select 事件执行
                setTimeout(_ => {
                    this.isFocus = false;
                }, 100);
            },
            handleKeyEnter() {
                if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
                    this.select(this.suggestions[this.highlightedIndex]);
                }
            },
            handleClickoutside() {
                this.isFocus = false;
            },
            select(item) {
                this.$emit('input', item.value);
                this.$emit('select', item);
                this.$nextTick(_ => {
                    this.suggestions = [];
                });
            },
            highlight(index) {
                if (!this.suggestionVisible || this.loading) { return; }
                if (index < 0) index = 0;
                if (index >= this.suggestions.length) {
                    index = this.suggestions.length - 1;
                }
                const suggestion = this.$refs.suggestions.$el.querySelector('.ep-search-suggestion__wrap');
                const suggestionList = suggestion.querySelectorAll('.ep-search-suggestion__list li');
                let highlightItem = suggestionList[index];
                let scrollTop = suggestion.scrollTop;
                let offsetTop = highlightItem.offsetTop;
                if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
                    suggestion.scrollTop += highlightItem.scrollHeight;
                }
                if (offsetTop < scrollTop) {
                    suggestion.scrollTop -= highlightItem.scrollHeight;
                }
                this.highlightedIndex = index;
            }
        },
        mounted() {
            this.$on('item-click', item => {
                this.select(item);
            });
        },
        beforeDestroy() {
            this.$refs.suggestions.$destroy();
        }
    };

</script>