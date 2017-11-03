export default {
  name: 'ep-card',

  props: {
    layout: {
      type: String,
      default: 'media, headers , action, contents, slot'
    }
  },

  render (h) {
    let template = <div class="ep-card"></div>

    const TEMPLATE_HTML = {
      media: <media></media>,
      headers: <headers></headers>,
      action: <action></action>,
      contents: <contents></contents>,
      slot: <default></default>
    }

    const components = this.layout.split(',').map((item) => item.trim())
    components.forEach(item => {
      template.children.push(TEMPLATE_HTML[item])
    })
    
    return template
  },

  components: {
    action: {
      render (h) {
        return (
          this.$parent.$slots.action
            ? <div class="ep-card-action">
              { this.$parent.$slots.action[0] }
            </div>
            : ''
        )
      }
    },
    media: {
      render (h) {
        return (
          this.$parent.$slots.media
            ? <div class="ep-card-media">
              { this.$parent.$slots.media[0] }
            </div>
            : ''
        )
      }
    },
    headers: {
      render (h) {
        return (
            this.$parent.$slots.headers
              ? <div class="ep-card-headers">
                { this.$parent.$slots.headers[0] }
              </div>
              : ''
          )
      }
    },
    contents: {
      render (h) {
        return (
          this.$parent.$slots.contents
            ? <div class="ep-card-contents">
              { this.$parent.$slots.contents[0] }
            </div>
            : ''
        )
      }
    },
    default: {
      render (h) {
        return (
          this.$parent.$slots.default
            ? <div class="ep-card-default">
              { this.$parent.$slots.default[0] }
            </div>
            : ''
        )
      }
    }
  }
}
