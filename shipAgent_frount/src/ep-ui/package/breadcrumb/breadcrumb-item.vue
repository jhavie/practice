<template>
  <span class="ep-breadcrumb__item">
    <span class="ep-breadcrumb__item__inner" ref="link"><slot></slot></span><span class="ep-breadcrumb__separator" v-if="type === 'separator'">{{separatorDisplay}}</span>
    <span class="ep-breadcrumb__icon" v-else><i :class="iconClass"></i></span>
  </span>
</template>
<script>
  export default {
    name: 'ep-breadcrumb-item',
    props: {
      icon: {
        type: String,
        default: ''
      },
      separator: {
        type: String,
        default: ''
      },
      to: {},
      replace: Boolean
    },
    computed: {
        iconClass() {
          if(this.icon !== ''){
            return 'ion-'+ this.icon;
          }
          else{
            return 'ion-'+ this.insideIcon;
          }
            
        },
        separatorDisplay() {
          if(this.separator !== ''){
            return this.separator;
          }
          else{
            return this.insideSeparator;
          }

        }
    },
    data() {
      return {
        type: '',
        insideIcon: '',
        insideSeparator: ''
      };
    },
    mounted() {
      if(this.icon !== ''){
        this.type = 'icon';
      }
      else if(this.separator !== ''){
        this.type = 'separator';
      }
      else if(this.$parent.icon !== ''){
          this.type = 'icon';
          this.insideIcon = this.$parent.icon
      }
      else{
          this.type = 'separator';
          this.insideSeparator = this.$parent.separator
      }
      
      var self = this;
      if (this.to) {
        let link = this.$refs.link;
        link.addEventListener('click', _ => {
          let to = this.to;
          self.replace ? self.$router.replace(to)
                       : self.$router.push(to);
        });
      }
    }
  };
</script>
