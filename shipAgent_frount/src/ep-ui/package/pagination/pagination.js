import Pager from "./pagination.vue";
import EpSelect from "../select";

export default {
  name: 'EpPager',

  props: {
    nowPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () { return [10, 20, 50, 100] }
    },
    totalNum: Number,
    pageCount: Number,
    layout: {
      type: String,
      default: 'total, sizeChange, pager, jump'
    },
    right: Boolean
  },

  data() {
    return {
      currentPageSize: this.pageSize,
      internalNowPage: 1
    }
  },

  computed: {
    internalPageCount() {
      if (typeof this.totalNum === 'number') {
        return Math.ceil(this.totalNum / this.currentPageSize);
      } else if (typeof this.pageCount === 'number') {
        return this.pageCount;
      }
      return null;
    }
  },

  render(h) {
    let style = this.right 
      ? { textAlign: 'right' }
      : {};
    let template = <div class="ep-page" style={ style }></div>
    const TEMPLATE_HTML = {
      total: <total></total>,
      sizeChange: <size-change pageSizes={ this.pageSizes }></size-change>,
      pager: <Pager now-page={ this.internalNowPage } page-count={ this.internalPageCount }
        on-change={ this.handleChange } ></Pager>,
      jump: <jump now-page={ this.internalNowPage } on-blur={ this.jumpBlur }></jump>,
      slot: <ep-slot></ep-slot>
    };

    const components = this.layout.split(',').map((item) => item.trim());
    components.forEach(item => {
      template.children.push(TEMPLATE_HTML[item]);
    });
    
    return template;
  },

  methods: {
    handleChange(val) {
      this.internalNowPage = this.getValidCurrentPage(val);
    },
    getValidCurrentPage(value) {
      value = parseInt(value, 10);
      const havePageCount = typeof this.internalPageCount === 'number';

      let resetValue;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },
    jumpBlur (val) {
      val = parseInt(val, 10)

      if (val < 1) {
        this.internalNowPage = 1
        return
      }
      if (val > this.internalPageCount) {
        this.internalNowPage = this.internalPageCount
        return
      }
      this.internalNowPage = val
    }
  },
  watch: {
    nowPage: {
      immediate: true,
      handler(val) {
        this.internalNowPage = val;
      }
    },
    internalPageCount (val) {
      this.$nextTick(() => {
        if (val < this.internalNowPage) {
          this.internalNowPage = val
        }
      })
    },
    internalNowPage(newVal, oldVal) {
      newVal = parseInt(newVal, 10);

      /* istanbul ignore if */
      if (isNaN(newVal)) {
        newVal = oldVal || 1;
      } else {
        newVal = this.getValidCurrentPage(newVal);
      }

      if (newVal !== undefined) {
        this.$nextTick(() => {
          this.internalNowPage = newVal;
          if (oldVal !== newVal) {
            this.$emit('change', this.internalNowPage);
          }
        });
      } else {
        this.$emit('change', this.internalNowPage);
      }

    }
  },

  components: {
    EpSlot: {
      render(h) {
        return (
          this.$parent.$slots.default
          ? this.$parent.$slots.default[0]
          : ''
        );
      }
    },
    total: {
      render(h) {
        return (
          typeof this.$parent.totalNum === 'number'
          ? <span class="ep-pager-total">数据量： { this.$parent.totalNum } 条</span>
          : ''
        );
      }
    },
    sizeChange: {
      props: {
        pageSizes: Array
      },
      render (h) {
        return (
          <div class="ep-pager-select">
            <ep-select 
              value={ this.$parent.currentPageSize } label={ this.pageSizes } 
              size="small"  position="bottom" placeholder="条数" exc-val="条/页"
              on-input={ this.handleChange }>
            </ep-select>
          </div>
          )
      },
      methods: {
        handleChange (val) {
          this.$parent.currentPageSize = val = parseInt(val, 10)
          this.$parent.$emit('size-change', this.$parent.currentPageSize)
        }
      }
    },
    Pager,
    jump: {
      props: {
        nowPage: [ String, Number ]
      },
      data () {
        return {
          model: this.nowPage
        }
      },
      render (h) {
        return (
          <span class="ep-pager-jump">
            前往
            <div class="ep-input--small ep-pager-jump-input">
              <input class="ep-input__inner" type="number"
                on-blur={ this.handleBlur } 
                value={ this.model } maxlength={ 5 } 
                min={ 1 } max={ this.$parent.internalPageCount } />
            </div>
          </span>
        )
      },
      methods: {
        handleBlur (evt) {
          this.model = evt.target.value
          this.$emit('blur', this.model)
        }
      }
    }
  }

}